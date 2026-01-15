import time
import requests
import yaml
import sys
import random
import os

API_URL = os.getenv("AUTOPULSE_API_URL")
API_KEY = os.getenv("AUTOPULSE_API_KEY")
INTERVAL = int(os.getenv("AUTOPULSE_INTERVAL", "60"))

if not API_URL or not API_KEY:
    print("❌ Missing required environment variables")
    sys.exit(1)

API_URL = API_URL.rstrip("/")

HEADERS = {
    "X-API-Key": API_KEY
}

BASE_DELAY = 5
MAX_DELAY = 300
MAX_RETRIES = 10

retry_count = 0


def backoff_delay(attempt):
    base = min(BASE_DELAY * (2 ** attempt), MAX_DELAY)
    jitter = random.uniform(0, base * 0.2)
    return base + jitter


def send_heartbeat():
    global retry_count

    try:
        res = requests.post(
            f"{API_URL}/systems/heartbeat",
            headers=HEADERS,
            timeout=5
        )

        # ✅ SUCCESS
        if res.status_code in (200, 201):
            print("✅ Heartbeat sent")
            retry_count = 0
            return True

        # ❌ FATAL ERRORS
        if res.status_code in (401, 403):
            print("❌ FATAL: API key invalid or revoked")
            sys.exit(1)

        if res.status_code == 404:
            print("❌ FATAL: Invalid endpoint")
            sys.exit(1)

        # 🔁 RETRYABLE
        if res.status_code in (429, 500, 502, 503):
            raise Exception(f"Retryable HTTP {res.status_code}")

        # ❓ UNKNOWN
        print(f"⚠️ Unexpected response: {res.status_code} {res.text}")

    except requests.exceptions.RequestException as e:
        print(f"⚠️ Network error: {e}")

    # 🔁 RETRY LOGIC
    retry_count += 1
    if retry_count > MAX_RETRIES:
        print("❌ Max retries exceeded. Giving up.")
        sys.exit(1)

    delay = backoff_delay(retry_count)
    print(f"🔁 Retry {retry_count}/{MAX_RETRIES} in {int(delay)}s")
    time.sleep(delay)
    return False


def main():
    print("🚀 AutoPulse agent started")
    print(f"Interval: {INTERVAL}s")

    while True:
        success = send_heartbeat()
        if success:
            time.sleep(INTERVAL)

if __name__ == "__main__":
    main()
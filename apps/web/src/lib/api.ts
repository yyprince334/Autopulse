const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

let refreshingPromise: Promise<string | null> | null = null;

async function refreshAccessToken() {
  if (refreshingPromise) return refreshingPromise;

  refreshingPromise = (async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) return null;

    const res = await fetch(`${API_BASE}auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) return null;

    const data = await res.json();
    localStorage.setItem("accessToken", data.accessToken);
    return data.accessToken;
  })();

  const token = await refreshingPromise;
  refreshingPromise = null;
  return token;
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  let token = localStorage.getItem("accessToken");

  let res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  // 🔁 Token expired → try refresh
  if (res.status === 401) {
    const newToken = await refreshAccessToken();

    if (!newToken) {
      // ❌ refresh failed → logout
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
      throw new Error("Session expired");
    }

    // 🔄 retry original request
    res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${newToken}`,
        ...(options.headers || {}),
      },
    });
  }

  const text = await res.text();

  if (!res.ok) {
    console.error("API ERROR:", {
      path,
      status: res.status,
      body: text,
    });
    throw new Error(text || "API request failed");
  }

  try {
    return text ? JSON.parse(text) : null;
  } catch (e) {
    console.error("JSON PARSE ERROR:", text);
    throw new Error("Invalid JSON response from API");
  }

  return res.json();
}

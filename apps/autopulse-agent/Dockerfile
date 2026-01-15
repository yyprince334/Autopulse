FROM python:3.11-slim

RUN useradd -m agent
WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY agent.py .

USER agent

# 🔑 Disable stdout buffering
ENV PYTHONUNBUFFERED=1

CMD ["python", "agent.py"]
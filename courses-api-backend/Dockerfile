# courses-api-backend/Dockerfile
FROM python:3.13-slim

# Don’t buffer logs, don’t write .pyc files
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Copy in your requirements (which now include psycopg2-binary)
COPY requirements.txt .

# Install Python deps
RUN pip install --upgrade pip \
 && pip install -r requirements.txt

# Copy the rest of your Django project
COPY . .

# Expose the port Gunicorn will run on
EXPOSE 8000

# Run migrations on startup (optional helper)
# ENTRYPOINT ["./entrypoint.sh"]

# Serve with Gunicorn
CMD ["gunicorn", "courses_api.wsgi:application", "--bind", "0.0.0.0:8008"]

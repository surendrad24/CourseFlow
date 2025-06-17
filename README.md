# CourseFlow
Application Software Centre, IIT Bombay

# 📚 CourseFlow – Course Management Application

CourseFlow is a full-stack containerized web application that allows academic institutions to manage their course offerings and delivery instances across semesters. This project was created as part of the ASC Software Developer Internship Application at IIT Bombay.

---

## 🔧 Tech Stack

- **Backend**: Django (Python)
- **Frontend**: ReactJS + TypeScript
- **Database**: PostgreSQL
- **Containerization**: Docker, Docker Compose
- **CI/CD**: GitHub Actions + DockerHub

---

## 🚀 Features

### Courses
- Add, view, and delete courses
- Store course title, code, and description

### Course Instances
- Add, view, and delete course delivery instances
- Organize by year, semester, and course ID

---

## 📂 Repository Structure

/backend # Django backend with REST API
/frontend # React frontend UI
/docker-compose.yml


---

## 📦 Docker Images

All images are published on DockerHub under:

👉 https://hub.docker.com/r/surendrad24/courseflow

| Component | Image | Pull Command |
|----------|--------|------------------------|
| Frontend | `surendrad24/courseflow:frontend` | `docker pull surendrad24/courseflow:frontend` |
| Backend  | `surendrad24/courseflow:backend`  | `docker pull surendrad24/courseflow:backend` |
| Database | `surendrad24/courseflow:db`       | `docker pull surendrad24/courseflow:db` |

---

## 🧪 API Endpoints

### Courses
- `POST /api/courses/`
- `GET /api/courses/`
- `GET /api/courses/{id}/`
- `DELETE /api/courses/{id}/`

### Instances
- `POST /api/instances/`
- `GET /api/instances/{year}/{semester}/`
- `GET /api/instances/{year}/{semester}/{id}/`
- `DELETE /api/instances/{year}/{semester}/{id}/`

---

## 🐳 Local Deployment with Docker Compose

1. Clone the repo
2. Create `.env` file (if needed for DB credentials)
3. Run:
```bash
docker-compose up --build


docker-compose.yml Sample

version: '3.8'
services:
  db:
    image: surendrad24/courseflow:db
    ports:
      - "5432:5432"

  backend:
    image: surendrad24/courseflow:backend
    ports:
      - "8000:8000"
    depends_on:
      - db

  frontend:
    image: surendrad24/courseflow:frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend


🌐 Live Demo (if hosted)

[Insert hosted app link here if available]
📹 Video Walkthrough

[Insert video link here]
🙋 Author

    Name: [Surendra Donthamsetti]

    GitHub: [https://github.com/surendrad24]

    Role: Applicant – ASC Software Developer Internship, IIT Bombay

📝 License

This project is built for educational and evaluation purposes only.

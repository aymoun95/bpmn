# BPMN Collaborative Editor

This project is a collaborative BPMN (Business Process Model and Notation) editor built with a React frontend and a Node.js/Express backend. It allows multiple users to view and edit BPMN diagrams in real time, with live locking to prevent concurrent edits. The application is fully containerized and can be run locally using Docker Compose.

## Features

- Real-time collaborative BPMN diagram editing
- User presence and live user count
- Editor locking to prevent concurrent modifications
- Modern React frontend with Tailwind CSS
- Node.js/Express backend with Socket.IO
- Dockerized for easy local development and deployment

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

### Running Locally

1. **Clone the repository:**

   ```bash
   git clone https://github.com/aymoun95/bpmn.git
   cd bpmn
   ```

2. **Start the application with Docker Compose:**

   ```bash
   docker-compose up --build
   ```

3. **Access the app:**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:3000](http://localhost:3000)

The frontend will connect to the backend automatically for real-time collaboration.

## Production Demo

You can try the production deployment here:

👉 **[https://frontend-bpmn.onrender.com](https://frontend-bpmn.onrender.com)**

> **Note:**
> This project is deployed on [Render](https://render.com) using their free tier. The server may go to sleep after periods of inactivity. If the app takes a while to load, please wait a bit—it will wake up and become responsive shortly.

## Project Structure

```
backend/    # Node.js/Express/Socket.IO backend
frontend/   # React + Vite + Tailwind frontend
```

## License

MIT

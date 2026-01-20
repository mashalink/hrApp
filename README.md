# HR App

A simple educational application for managing employees.  
The project is split into two independent parts:

- **hrApp-frontend/** — React (Vite) frontend
- **hrApp-backend/** — API (json-server) deployed on Render

## 🚀 Deployments

### Frontend

Deployed as a Static Site on Render:  
https://hrappsite.onrender.com/

### Backend

API deployed on Render:  
https://hrapp-ovc7.onrender.com/employees

## 🧰 Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios
- Material UI (MUI)

### Backend

- JSON Server
- Render Web Service

## ✨ Features

- View employee list
- Add new employees
- Edit employee details
- Probation and anniversary reminders

## 📂 Project Structure

```
hrApp/
│
├── hrApp-frontend/
│   └── src/
│
├── hrApp-backend/
│   └── db.json
│
└── README.md
```

## 🔌 API Endpoints

Fetch all employees:

```
GET /employees
```

Create a new employee:

```
POST /employees
```

Update an employee:

```
PATCH /employees/:id
```

## 🏃 Running Locally

### Backend

```
cd hrApp-backend
npm install
npm start
```

### Frontend

```
cd hrApp-frontend
npm install
npm run dev
```

## 📝 Notes

- The project is separated into frontend and backend for easier deployment and maintenance.
- In production, the frontend automatically communicates with the backend deployed on Render.

## ✅ Done

- Frontend deployed on Render with Vite + React Router setup
- Backend JSON Server deployed on Render with employee CRUD endpoints
- Axios-based data fetching wired to the deployed API
- Local development scripts verified for both frontend and backend



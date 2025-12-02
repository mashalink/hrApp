# HR App

A simple educational application for managing employees.  
The project is split into two independent parts:

- **hrApp-frontend/** — React (Vite) frontend
- **hrApp-backend/** — API (json-server) deployed on Render

## 🚀 Deployments

### Frontend

Deployed as a Static Site on Render:  
https://hrapp-1-y52h.onrender.com/

### Backend

API deployed on Render:  
https://hrapp-ovc7.onrender.com/employees

## 🧰 Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios

### Backend

- JSON Server
- Render Web Service

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
- CSS styling is still a work in progress.

## 📌 To-Do

- Improve UI styles (CSS)
- Add better error handling and notifications
- Expand employee data model (positions, departments, etc.)
- Add search and filtering features

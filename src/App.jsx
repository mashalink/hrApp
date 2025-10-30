import "./App.css";
import { useState } from "react";
import { data } from "./data/data.js";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import PersonList from "./components/PersonList.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  const [employees, setEmployees] = useState(data); // Инициализация состояния с данными пока что из data.js и setEmployees не используется, в дальнейшем будет нужно для добавления новых сотрудников

  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<PersonList employees={employees} />} />
            <Route
              path="/add-employee"
              element={<div>Add Employee Page (to be implemented)</div>} // Заглушка для страницы добавления сотрудника
            />
            <Route
              path="/employee/:id"
              element={<div>Employee Detail Page (to be implemented)</div>} // Заглушка для страницы деталей сотрудника
            />
            <Route
              path="/about"
              element={
                <div>
                  <h2>About This HR Application</h2>
                  <p>
                    This application is designed to manage employee records
                    efficiently.
                  </p>
                </div>
              }
            />
            <Route
              path="*"
              element={
                <div>
                  <h2>404 - Page Not Found</h2>
                  {/* Заглушка для несущестующих маршрутов */}
                  <p>The page you are looking for does not exist.</p>
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

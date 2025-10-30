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
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

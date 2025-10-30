import "./App.css";
import { useState } from "react";
import { data } from "./data/data.js";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import PersonList from "./components/PersonList.jsx";

export default function App() {
  const [employees, setEmployees] = useState(data); // Инициализация состояния с данными пока что из data.js и setEmployees не используется, в дальнейшем будет нужно для добавления новых сотрудников

  return (
    <div className="container">
      <Header />
      <main className="main">
        <PersonList employees={employees}></PersonList>
      </main>
      <Footer />
    </div>
  );
}

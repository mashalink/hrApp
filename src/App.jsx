import "./App.css";
import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import FooterPage from "./components/Footer.jsx";
import AddEmployee from "./components/AddEmployee.jsx";
import axios from "axios";

export default function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err));
  }, []);

  async function onAddEmployee(formData) {
    const payload = {
      id: Date.now(),
      ...formData,
      salary: Number(formData.salary),
      skills: formData.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    const res = await axios.post("http://localhost:3001/employees", payload);
    setEmployees((prev) => [...prev, res.data]);
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home employees={employees} /> },
        { path: "about", element: <About /> },
        { path: "footer", element: <FooterPage /> },
        {
          path: "add_employee",
          element: <AddEmployee onAddEmployee={onAddEmployee} />,
        },
        { path: "*", element: <div>404 - Not Found</div> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

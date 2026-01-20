import "./App.css";
import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import FooterPage from "./components/Footer.jsx";
import AddEmployee from "./components/AddEmployee.jsx";
import EmployeeTable from "./components/EmployeeTable.jsx";
import useAxios from "./hooks/useAxios.js";

export default function App() {
  const [employees, setEmployees] = useState([]);
  const { get, post, patch } = useAxios();

  useEffect(() => {
    get("/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err));
  }, []);

  async function onAddEmployee(formData) {
    try {
      const payload = {
        ...formData,
        salary: Number(formData.salary),
        skills: formData.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };

      const res = await post("/employees", payload);
      setEmployees((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Failed to add employee", err);
      alert("Something went wrong while adding the employee.");
    }
  }

  async function onUpdateEmployee(id, updates) {
    try {
      const res = await patch(`/employees/${id}`, updates);

      setEmployees((prev) =>
        prev.map((emp) => (emp.id === id ? res.data : emp))
      );

      return res.data;
    } catch (err) {
      console.error("Failed to update employee", err);
      alert("Failed to save changes.");
      throw err;
    }
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <Home employees={employees} onUpdateEmployee={onUpdateEmployee} />
          ),
        },
        { path: "about", element: <About /> },
        { path: "footer", element: <FooterPage /> },
        {
          path: "add_employee",
          element: <AddEmployee onAddEmployee={onAddEmployee} />,
        },
        {
          path: "table",
          element: <EmployeeTable employees={employees} />,
        },
        { path: "*", element: <div>404 - Not Found</div> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

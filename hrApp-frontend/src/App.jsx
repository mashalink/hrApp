import "./App.css";
import { useState, useEffect } from "react";
import { Alert, Snackbar } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import FooterPage from "./components/Footer.jsx";
import AddEmployee from "./components/AddEmployee.jsx";
import EmployeeTable from "./components/EmployeeTable.jsx";
import useAxios from "./hooks/useAxios.js";

const ADD_EMPLOYEE_ERROR = "Something went wrong while adding the employee.";
const UPDATE_EMPLOYEE_ERROR = "Failed to save changes.";

function getRequestErrorMessage(error, fallbackMessage) {
  if (typeof error?.response?.data === "string" && error.response.data.trim()) {
    return error.response.data;
  }

  if (
    typeof error?.response?.data?.message === "string" &&
    error.response.data.message.trim()
  ) {
    return error.response.data.message;
  }

  return fallbackMessage;
}

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const { get, post, patch } = useAxios();

  function showSnackbar(message, severity = "info") {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  }

  function handleCloseSnackbar(_, reason) {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  }

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
      showSnackbar("Employee added successfully.", "success");

      return {
        ok: true,
        employee: res.data,
        error: null,
      };
    } catch (err) {
      console.error("Failed to add employee", err);
      const errorMessage = getRequestErrorMessage(err, ADD_EMPLOYEE_ERROR);

      showSnackbar(errorMessage, "error");

      return {
        ok: false,
        employee: null,
        error: errorMessage,
      };
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
      showSnackbar(UPDATE_EMPLOYEE_ERROR, "error");
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

  return (
    <>
      <RouterProvider router={router} />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

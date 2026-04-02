import "./App.css";
import { Alert, Snackbar } from "@mui/material";
import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  createEmployee,
  fetchEmployees,
  getRequestErrorMessage,
  updateEmployee,
} from "./api/employees.js";
import Layout from "./components/Layout.jsx";

const Home = lazy(() => import("./components/Home.jsx"));
const About = lazy(() => import("./components/About.jsx"));
const AddEmployee = lazy(() => import("./components/AddEmployee.jsx"));
const EmployeeTable = lazy(() => import("./components/EmployeeTable.jsx"));

const LOAD_EMPLOYEES_ERROR = "Failed to load employees.";
const ADD_EMPLOYEE_ERROR = "Something went wrong while adding the employee.";
const UPDATE_EMPLOYEE_ERROR = "Failed to save changes.";

const initialSnackbarState = {
  open: false,
  message: "",
  severity: "success",
};

function RouteFallback() {
  return <div>Loading...</div>;
}

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [snackbar, setSnackbar] = useState(initialSnackbarState);

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
    let isActive = true;

    async function loadEmployees() {
      try {
        const res = await fetchEmployees();

        if (isActive) {
          setEmployees(res.data);
        }
      } catch (err) {
        console.error("Failed to load employees", err);

        if (isActive) {
          setSnackbar({
            open: true,
            message: getRequestErrorMessage(err, LOAD_EMPLOYEES_ERROR),
            severity: "error",
          });
        }
      }
    }

    loadEmployees();

    return () => {
      isActive = false;
    };
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

      const res = await createEmployee(payload);
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
      const res = await updateEmployee(id, updates);

      setEmployees((prev) => prev.map((emp) => (emp.id === id ? res.data : emp)));

      return res.data;
    } catch (err) {
      console.error("Failed to update employee", err);
      showSnackbar(UPDATE_EMPLOYEE_ERROR, "error");
      throw err;
    }
  }

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                  <Home employees={employees} onUpdateEmployee={onUpdateEmployee} />
                }
              />
              <Route path="about" element={<About />} />
              <Route
                path="add_employee"
                element={<AddEmployee onAddEmployee={onAddEmployee} />}
              />
              <Route path="table" element={<EmployeeTable employees={employees} />} />
              <Route path="*" element={<div>404 - Not Found</div>} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
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

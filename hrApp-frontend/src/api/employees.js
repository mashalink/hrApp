import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? "https://hrapp-ovc7.onrender.com" : "http://localhost:3001");

const client = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export function fetchEmployees() {
  return client.get("/employees");
}

export function createEmployee(data) {
  return client.post("/employees", data);
}

export function updateEmployee(id, data) {
  return client.patch(`/employees/${id}`, data);
}

export function getRequestErrorMessage(error, fallbackMessage) {
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

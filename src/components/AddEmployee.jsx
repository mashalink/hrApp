import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddEmployee({ onAddEmployee }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    salary: "",
    phone: "",
    email: "",
    animal: "",
    startDate: "",
    location: "",
    department: "",
    skills: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await onAddEmployee(formData);
    navigate("/");
  }

  return (
    <div>
      <h2>Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label>{key}:</label>
            <input
              name={key}
              value={formData[key]}
              onChange={handleChange}
              type={
                key === "salary"
                  ? "number"
                  : key === "startDate"
                  ? "date"
                  : "text"
              }
              required={["name", "title", "email"].includes(key)}
            />
          </div>
        ))}
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
}

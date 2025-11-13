import { useState } from "react";

export default function AddEmployee({ onAddEmployee }) {
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
    setFormData({
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
  }

  return (
    <div>
      <h2>Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label>
              {key}:
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
                required={["name", "title", "email", "salary"].includes(key)}
              />
            </label>
          </div>
        ))}
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
}

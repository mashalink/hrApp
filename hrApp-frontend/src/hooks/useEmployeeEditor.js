import { useState } from "react";

export default function useEmployeeEditor(initialValues, onUpdateEmployee, id) {
  const { salary, location, department, skills } = initialValues;

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const [formData, setFormData] = useState({
    salary: salary ?? 0,
    location: location ?? "",
    department: department ?? "",
    skillsText: Array.isArray(skills) ? skills.join(", ") : "",
  });

  function resetForm() {
    setFormData({
      salary: salary ?? 0,
      location: location ?? "",
      department: department ?? "",
      skillsText: Array.isArray(skills) ? skills.join(", ") : "",
    });
  }

  function startEditing() {
    resetForm();
    setIsEditing(true);
    setSaveMessage("");
  }

  function cancelEditing() {
    resetForm();
    setIsEditing(false);
    setSaveMessage("");
  }

  function handleFieldChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "salary" ? Number(value) : value,
    }));
  }

  async function saveChanges() {
    const updates = {};

    if (formData.salary !== salary) updates.salary = formData.salary;
    if (formData.location !== location) updates.location = formData.location;
    if (formData.department !== department)
      updates.department = formData.department;

    const originalSkills = Array.isArray(skills) ? skills.join(", ") : "";
    if (formData.skillsText !== originalSkills) {
      updates.skills = formData.skillsText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    // Nothing changed
    if (Object.keys(updates).length === 0) {
      setIsEditing(false);
      return;
    }

    try {
      setIsSaving(true);
      await onUpdateEmployee(id, updates);
      setIsEditing(false);
      setSaveMessage("Changes saved ✔");
      setTimeout(() => setSaveMessage(""), 2000);
    } catch {
      // handled at parent
    } finally {
      setIsSaving(false);
    }
  }

  return {
    isEditing,
    isSaving,
    formData,
    saveMessage,
    startEditing,
    cancelEditing,
    handleFieldChange,
    saveChanges,
  };
}

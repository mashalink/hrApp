import { useEffect, useRef, useState } from "react";

const initialFieldErrors = {
  salary: "",
};

function createFormData({ salary, location, department, skills }) {
  return {
    salary: salary === null || salary === undefined ? "" : String(salary),
    location: location ?? "",
    department: department ?? "",
    skillsText: Array.isArray(skills) ? skills.join(", ") : "",
  };
}

function validateSalary(value) {
  const trimmedValue = typeof value === "string" ? value.trim() : value;

  if (trimmedValue === "") {
    return "Salary is required.";
  }

  const numericSalary = Number(trimmedValue);

  if (Number.isNaN(numericSalary)) {
    return "Salary must be a number.";
  }

  if (numericSalary < 0) {
    return "Salary must be 0 or more.";
  }

  return "";
}

export default function useEmployeeEditor(initialValues, onUpdateEmployee, id) {
  const { salary, location, department, skills } = initialValues;

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState(initialFieldErrors);
  const saveMessageTimerRef = useRef(null);

  const [formData, setFormData] = useState(() => createFormData(initialValues));

  useEffect(() => {
    return () => {
      if (saveMessageTimerRef.current) {
        window.clearTimeout(saveMessageTimerRef.current);
      }
    };
  }, []);

  function resetForm() {
    setFormData(createFormData(initialValues));
    setFieldErrors(initialFieldErrors);
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
      [name]: value,
    }));

    if (name === "salary") {
      setFieldErrors((prev) => ({
        ...prev,
        salary: validateSalary(value),
      }));
    }
  }

  async function saveChanges() {
    const salaryError = validateSalary(formData.salary);
    const nextFieldErrors = {
      salary: salaryError,
    };

    setFieldErrors(nextFieldErrors);

    if (salaryError) {
      return;
    }

    const nextSalary = Number(formData.salary);
    const updates = {};

    if (nextSalary !== salary) updates.salary = nextSalary;
    if (formData.location !== location) updates.location = formData.location;
    if (formData.department !== department) updates.department = formData.department;

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

      if (saveMessageTimerRef.current) {
        window.clearTimeout(saveMessageTimerRef.current);
      }

      saveMessageTimerRef.current = window.setTimeout(() => {
        setSaveMessage("");
        saveMessageTimerRef.current = null;
      }, 2000);
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
    fieldErrors,
    saveMessage,
    startEditing,
    cancelEditing,
    handleFieldChange,
    saveChanges,
  };
}

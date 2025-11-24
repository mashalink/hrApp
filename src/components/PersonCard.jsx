import { useState } from "react";
import styles from "./PersonCard.module.css";
import { getAnimalEmoji } from "../utils/animalEmoji";

export default function Person({
  id,
  name,
  title,
  salary,
  phone,
  email,
  animal,
  location,
  department,
  skills,
  startDate,
  onUpdateEmployee,
}) {
  const years = (
    (Date.now() - new Date(startDate)) /
    (1000 * 60 * 60 * 24 * 365)
  ).toFixed(1);
  const yearsNum = parseFloat(years);

  const isAnniversary = yearsNum % 5 === 0 && yearsNum >= 5;
  const isProbation = yearsNum < 0.5;

  // 🔹 Локальное состояние для редактирования
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    salary: salary ?? 0,
    location: location ?? "",
    department: department ?? "",
    skillsText: Array.isArray(skills) ? skills.join(", ") : "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  function handleEditClick() {
    // сбрасываем форму в актуальные пропсы на случай, если данные поменялись в родителе
    setFormData({
      salary: salary ?? 0,
      location: location ?? "",
      department: department ?? "",
      skillsText: Array.isArray(skills) ? skills.join(", ") : "",
    });
    setIsEditing(true);
    setSaveMessage("");
  }

  function handleCancel() {
    setFormData({
      salary: salary ?? 0,
      location: location ?? "",
      department: department ?? "",
      skillsText: Array.isArray(skills) ? skills.join(", ") : "",
    });
    setIsEditing(false);
    setSaveMessage("");
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "salary" ? Number(value) : value,
    }));
  }

  async function handleSave() {
    // строим объект только с изменёнными полями
    const updates = {};

    if (formData.salary !== salary) {
      updates.salary = formData.salary;
    }

    if (formData.location !== location) {
      updates.location = formData.location;
    }

    if (formData.department !== department) {
      updates.department = formData.department;
    }

    const originalSkillsText = Array.isArray(skills) ? skills.join(", ") : "";
    if (formData.skillsText !== originalSkillsText) {
      updates.skills = formData.skillsText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    // если ничего не поменялось — просто выходим из edit mode
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
      // onUpdateEmployee уже показал alert
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <article className={styles.card}>
      <h3 className={styles.name}>{name}</h3>

      {isAnniversary && (
        <div className={styles.reminder}>🎉 Schedule recognition meeting.</div>
      )}
      {isProbation && (
        <div className={styles.reminder}>🔔 Schedule probation review.</div>
      )}

      <p className={styles.title}>Title: {title}</p>

      {/* 🔹 Режим отображения / редактирования зарплаты */}
      {isEditing ? (
        <p className={styles.salary}>
          Salary:{" "}
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
          />{" "}
          €
        </p>
      ) : (
        <p className={styles.salary}>Salary: {salary} €</p>
      )}

      <p className={styles.phone}>
        Phone: <a href={`tel:${phone}`}>{phone}</a>
      </p>
      <p className={styles.email}>
        Email: <a href={`mailto:${email}`}>{email}</a>
      </p>
      <p className={styles.animal}>Animal: {getAnimalEmoji(animal)}</p>

      {/* 🔹 Location */}
      {isEditing ? (
        <p className={styles.location}>
          Location:{" "}
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </p>
      ) : (
        <p className={styles.location}>Location: {location}</p>
      )}

      {/* 🔹 Department */}
      {isEditing ? (
        <p className={styles.department}>
          Department:{" "}
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
          />
        </p>
      ) : (
        <p className={styles.department}>Department: {department}</p>
      )}

      {/* 🔹 Skills */}
      <div className={styles.skills}>
        <span>Skills:</span>
        {isEditing ? (
          <input
            type="text"
            name="skillsText"
            value={formData.skillsText}
            onChange={handleChange}
            placeholder="comma, separated, skills"
          />
        ) : (
          <ul>
            {Array.isArray(skills) &&
              skills.map((skill) => <li key={skill}>{skill}</li>)}
          </ul>
        )}
      </div>

      {/* 🔹 Кнопки и сообщение о сохранении */}
      <div className={styles.actions}>
        {isEditing ? (
          <>
            <button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </button>
            <button type="button" onClick={handleCancel} disabled={isSaving}>
              Cancel
            </button>
          </>
        ) : (
          <button type="button" onClick={handleEditClick}>
            Edit
          </button>
        )}

        {saveMessage && (
          <span className={styles.saveMessage}>{saveMessage}</span>
        )}
      </div>
    </article>
  );
}

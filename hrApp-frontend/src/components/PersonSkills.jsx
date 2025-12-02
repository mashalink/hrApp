import styles from "./PersonCard.module.css";

export default function PersonSkills({
  isEditing,
  formData,
  onChange,
  skills,
}) {
  return (
    <div className={styles.skills}>
      <span>Skills:</span>
      {isEditing ? (
        <input
          type="text"
          name="skillsText"
          value={formData.skillsText}
          onChange={onChange}
          placeholder="comma, separated, skills"
        />
      ) : (
        <ul>
          {Array.isArray(skills) &&
            skills.map((skill) => <li key={skill}>{skill}</li>)}
        </ul>
      )}
    </div>
  );
}

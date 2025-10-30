import styles from "./PersonCard.module.css";
import { getAnimalEmoji } from "../utils/animalEmoji";

export default function Person({
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
}) {
  const years = (
    (Date.now() - new Date(startDate)) /
    (1000 * 60 * 60 * 24 * 365)
  ).toFixed(1);
  console.log(years);
  const yearsNum = parseFloat(years);

  const isAnniversary = yearsNum % 5 === 0 && yearsNum >= 5;
  const isProbation = yearsNum < 0.5;
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
      <p className={styles.salary}>Salary: {salary} €</p>
      <p className={styles.phone}>
        Phone: <a href={`tel:${phone}`}>{phone}</a>
      </p>
      <p className={styles.email}>
        Email: <a href={`mailto:${email}`}>{email}</a>
      </p>
      <p className={styles.animal}>Animal: {getAnimalEmoji(animal)}</p>
      <p className={styles.location}>Location: {location}</p>
      <p className={styles.department}>Department: {department}</p>
      <div className={styles.skills}>
        <span>Skills:</span>
        <ul>
          {skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

import styles from "./PersonCard.module.css";

export default function PersonFields({
  isEditing,
  formData,
  onChange,
  salary,
  phone,
  email,
  animal,
  location,
  department,
}) {
  return (
    <>
      {isEditing ? (
        <p className={styles.salary}>
          Salary:{" "}
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={onChange}
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

      <p className={styles.animal}>Animal: {animal}</p>

      {isEditing ? (
        <p className={styles.location}>
          Location:{" "}
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={onChange}
          />
        </p>
      ) : (
        <p className={styles.location}>Location: {location}</p>
      )}

      {isEditing ? (
        <p className={styles.department}>
          Department:{" "}
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={onChange}
          />
        </p>
      ) : (
        <p className={styles.department}>Department: {department}</p>
      )}
    </>
  );
}

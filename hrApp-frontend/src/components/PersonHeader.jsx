import styles from "./PersonCard.module.css";

export default function PersonHeader({ name, isAnniversary, isProbation }) {
  return (
    <>
      <h3 className={styles.name}>{name}</h3>
      {isAnniversary && (
        <div className={styles.reminder}>🎉 Schedule recognition meeting.</div>
      )}
      {isProbation && (
        <div className={styles.reminder}>🔔 Schedule probation review.</div>
      )}
    </>
  );
}

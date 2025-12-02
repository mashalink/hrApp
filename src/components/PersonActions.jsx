import styles from "./PersonCard.module.css";

export default function PersonActions({
  isEditing,
  isSaving,
  saveMessage,
  onEdit,
  onCancel,
  onSave,
}) {
  return (
    <div className={styles.actions}>
      {isEditing ? (
        <>
          <button onClick={onSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save"}
          </button>
          <button type="button" onClick={onCancel} disabled={isSaving}>
            Cancel
          </button>
        </>
      ) : (
        <button type="button" onClick={onEdit}>
          Edit
        </button>
      )}

      {saveMessage && <span className={styles.saveMessage}>{saveMessage}</span>}
    </div>
  );
}

import styles from "./PersonCard.module.css";
import { getAnimalEmoji } from "../utils/animalEmoji";
import { getEmployeeFlags } from "../utils/calcEmployeeFlags";
import useEmployeeEditor from "../hooks/useEmployeeEditor";

import PersonHeader from "./PersonHeader";
import PersonFields from "./PersonFields";
import PersonSkills from "./PersonSkills";
import PersonActions from "./PersonActions";

export default function Person(props) {
  const {
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
  } = props;

  const { isAnniversary, isProbation } = getEmployeeFlags(startDate);

  const {
    isEditing,
    isSaving,
    formData,
    saveMessage,
    startEditing,
    cancelEditing,
    handleFieldChange,
    saveChanges,
  } = useEmployeeEditor(
    { salary, location, department, skills },
    onUpdateEmployee,
    id
  );

  return (
    <article className={styles.card}>
      <PersonHeader
        name={name}
        isAnniversary={isAnniversary}
        isProbation={isProbation}
      />

      <p className={styles.title}>Title: {title}</p>

      <PersonFields
        isEditing={isEditing}
        formData={formData}
        onChange={handleFieldChange}
        salary={salary}
        phone={phone}
        email={email}
        animal={getAnimalEmoji(animal)}
        location={location}
        department={department}
      />

      <PersonSkills
        isEditing={isEditing}
        formData={formData}
        onChange={handleFieldChange}
        skills={skills}
      />

      <PersonActions
        isEditing={isEditing}
        isSaving={isSaving}
        saveMessage={saveMessage}
        onEdit={startEditing}
        onCancel={cancelEditing}
        onSave={saveChanges}
      />
    </article>
  );
}

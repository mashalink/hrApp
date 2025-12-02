import Person from "./PersonCard.jsx";
import style from "./PersonList.module.css";

export default function PersonList({ employees, onUpdateEmployee }) {
  return (
    <div className={style.cardContainer}>
      {employees.map((employee) => (
        <Person
          key={employee.id}
          id={employee.id}
          name={employee.name}
          title={employee.title}
          salary={employee.salary}
          phone={employee.phone}
          email={employee.email}
          animal={employee.animal}
          location={employee.location}
          department={employee.department}
          skills={employee.skills}
          startDate={employee.startDate}
          onUpdateEmployee={onUpdateEmployee}
        />
      ))}
    </div>
  );
}

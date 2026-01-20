import PersonList from "./PersonList.jsx";

export default function Home({ employees, onUpdateEmployee }) {
  return (
    <div>
      <PersonList employees={employees} onUpdateEmployee={onUpdateEmployee} />
    </div>
  );
}

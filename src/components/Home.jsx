import PersonList from "./PersonList.jsx";

export default function Home({ employees, onUpdateEmployee }) {
  return (
    <PersonList employees={employees} onUpdateEmployee={onUpdateEmployee} />
  );
}

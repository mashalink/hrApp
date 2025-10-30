import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.logo}>
        HR App
      </NavLink>
      <nav className={styles.nav}>
        <div className={styles.links}>
          <NavLink to="/">Employees</NavLink>
          <NavLink to="/add-employee">Add Employee</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
      </nav>
    </header>
  );
}

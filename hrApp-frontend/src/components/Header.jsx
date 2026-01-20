// import styles from "./Header.module.css";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          HR App
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={NavLink} to="/">
            Employees
          </Button>
          <Button color="inherit" component={NavLink} to="/table">
            Table
          </Button>
          <Button color="inherit" component={NavLink} to="/add_employee">
            Add Employee
          </Button>
          <Button color="inherit" component={NavLink} to="/about">
            About
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

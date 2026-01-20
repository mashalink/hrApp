import { Box } from "@mui/material";
import Person from "./PersonCard.jsx";

export default function PersonList({ employees, onUpdateEmployee }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
        gap: 3,
        maxWidth: 1200,
        mx: "auto",
        mt: 4,
        px: 2,
      }}
    >
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
    </Box>
  );
}

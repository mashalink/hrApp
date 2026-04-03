import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EmployeesState from "./EmployeesState.jsx";

export default function EmployeeTable({ employees }) {
  if (employees.length === 0) {
    return <EmployeesState variant="empty" />;
  }

  const employeeCount = employees.length;

  return (
    <Box sx={{ width: "100%", maxWidth: 1100, mx: "auto", mt: 4, px: 2 }}>
      <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: { xs: 2, md: 3 } }}>
        <Box
          sx={{
            mb: 3,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="overline"
              color="secondary.dark"
              sx={{ letterSpacing: "0.16em" }}
            >
              Directory Table
            </Typography>
            <Typography variant="h3" sx={{ mt: 1 }}>
              Employees Table
            </Typography>
          </Box>
          <Chip
            color="primary"
            label={`${employeeCount} records`}
            sx={{ alignSelf: { xs: "flex-start", md: "center" } }}
          />
        </Box>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          A compact operational view for scanning titles, locations, teams, and salary
          at a glance.
        </Typography>

        <TableContainer
          sx={{
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            backgroundColor: "rgba(255, 255, 255, 0.55)",
          }}
        >
          <Table size="small">
            <TableHead sx={{ backgroundColor: "rgba(31, 111, 102, 0.08)" }}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Location</TableCell>
                <TableCell align="right">Salary</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow
                  key={employee.id}
                  sx={{
                    "&:nth-of-type(odd)": {
                      backgroundColor: "rgba(255, 255, 255, 0.42)",
                    },
                    "&:hover": {
                      backgroundColor: "rgba(31, 111, 102, 0.05)",
                    },
                  }}
                >
                  <TableCell sx={{ fontWeight: 700 }}>{employee.name}</TableCell>
                  <TableCell>{employee.title}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.location}</TableCell>
                  <TableCell align="right">
                    {new Intl.NumberFormat("fi-FI").format(employee.salary)} €
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

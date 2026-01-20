import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export default function EmployeeTable({ employees }) {
  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          Employees Table
        </Typography>

        <TableContainer
          sx={{ borderRadius: 2, border: "1px solid", borderColor: "divider" }}
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Location</TableCell>
                <TableCell align="right">Salary</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {employees.map((e) => (
                <TableRow key={e.id}>
                  <TableCell>{e.name}</TableCell>
                  <TableCell>{e.title}</TableCell>
                  <TableCell>{e.department}</TableCell>
                  <TableCell>{e.location}</TableCell>
                  <TableCell align="right">{e.salary} €</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

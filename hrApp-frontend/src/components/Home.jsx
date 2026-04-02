import { alpha } from "@mui/material/styles";
import { Box, Paper, Stack, Typography } from "@mui/material";
import PersonList from "./PersonList.jsx";
import { getEmployeeFlags } from "../utils/calcEmployeeFlags.js";

export default function Home({ employees, onUpdateEmployee }) {
  const departments = new Set(
    employees.map((employee) => employee.department).filter(Boolean),
  ).size;
  const locations = new Set(
    employees.map((employee) => employee.location).filter(Boolean),
  ).size;
  const milestoneCount = employees.filter((employee) => {
    const { isAnniversary, isProbation } = getEmployeeFlags(employee.startDate);
    return isAnniversary || isProbation;
  }).length;

  const overviewStats = [
    { label: "Employees", value: employees.length.toString().padStart(2, "0") },
    { label: "Departments", value: departments.toString().padStart(2, "0") },
    { label: "Locations", value: locations.toString().padStart(2, "0") },
    { label: "Milestones", value: milestoneCount.toString().padStart(2, "0") },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        sx={{
          maxWidth: 1200,
          mx: "auto",
          mt: 4,
          px: { xs: 3, md: 4.5 },
          py: { xs: 3.5, md: 4.5 },
          borderRadius: { xs: 2, md: 3 },
          position: "relative",
          background:
            "linear-gradient(135deg, rgba(24, 50, 47, 0.96) 0%, rgba(31, 111, 102, 0.9) 55%, rgba(196, 111, 68, 0.78) 100%)",
          color: "#fffaf4",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: "auto -80px -80px auto",
            width: 240,
            height: 240,
            borderRadius: "50%",
            background: alpha("#fffaf4", 0.08),
          }}
        />
        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={4}
          justifyContent="space-between"
          sx={{ position: "relative" }}
        >
          <Box maxWidth={620}>
            <Typography
              variant="overline"
              sx={{ color: alpha("#fffaf4", 0.78), letterSpacing: "0.18em" }}
            >
              Team Overview
            </Typography>
            <Typography variant="h2" sx={{ mt: 1, lineHeight: 1.05 }}>
              A warmer, clearer view of your employee roster.
            </Typography>
            <Typography
              variant="body1"
              sx={{ mt: 2, maxWidth: 560, color: alpha("#fffaf4", 0.82) }}
            >
              Keep track of people details, notice milestones early, and update records
              without digging through cluttered screens.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(120px, 1fr))",
              gap: 2,
              width: { xs: "100%", sm: "fit-content" },
              alignSelf: "center",
            }}
          >
            {overviewStats.map((stat) => (
              <Box
                key={stat.label}
                sx={{
                  width: { xs: "100%", sm: 132 },
                  aspectRatio: "1 / 1",
                  display: "grid",
                  placeItems: "center",
                  textAlign: "center",
                  p: 2,
                  borderRadius: "50%",
                  backgroundColor: alpha("#fffaf4", 0.12),
                  border: `1px solid ${alpha("#fffaf4", 0.18)}`,
                  backdropFilter: "blur(6px)",
                }}
              >
                <Typography
                  variant="overline"
                  sx={{
                    display: "block",
                    color: alpha("#fffaf4", 0.78),
                    letterSpacing: "0.12em",
                    lineHeight: 1.4,
                  }}
                >
                  {stat.label}
                </Typography>
                <Typography variant="h4" sx={{ lineHeight: 1.1 }}>
                  {stat.value}
                </Typography>
              </Box>
            ))}
          </Box>
        </Stack>
      </Paper>

      <PersonList employees={employees} onUpdateEmployee={onUpdateEmployee} />
    </Box>
  );
}

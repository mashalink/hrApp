import { Box, Button, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const stateConfig = {
  loading: {
    title: "Loading employees",
    description: "Fetching the latest employee data from the backend.",
  },
  loadingSlow: {
    title: "Still loading employees",
    description:
      "The backend is taking longer than usual to respond. This can happen when the service is waking up.",
  },
  error: {
    title: "Backend unavailable",
    description:
      "The employee directory could not be loaded. Check the backend and try again.",
  },
  empty: {
    title: "No employees yet",
    description:
      "Add the first employee to populate the directory and table views.",
  },
};

export default function EmployeesState({
  variant,
  isSlow = false,
  errorMessage = "",
  onRetry,
}) {
  const configKey = variant === "loading" && isSlow ? "loadingSlow" : variant;
  const { title, description } = stateConfig[configKey];

  return (
    <Paper
      sx={{
        width: "100%",
        maxWidth: 1100,
        mx: "auto",
        mt: 4,
        px: { xs: 3, md: 4 },
        py: { xs: 4, md: 5 },
        borderRadius: { xs: 2, md: 3 },
      }}
    >
      <Stack spacing={2} alignItems="center" textAlign="center">
        {variant === "loading" && (
          <CircularProgress size={34} thickness={4} color="primary" />
        )}

        <Box>
          <Typography variant="h4">{title}</Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 1, maxWidth: 620 }}
          >
            {description}
          </Typography>
          {variant === "error" && errorMessage && (
            <Typography variant="body2" color="error.main" sx={{ mt: 1.5 }}>
              {errorMessage}
            </Typography>
          )}
        </Box>

        {variant === "error" && (
          <Button variant="contained" onClick={onRetry}>
            Retry
          </Button>
        )}

        {variant === "empty" && (
          <Button component={RouterLink} to="/add_employee" variant="contained">
            Add Employee
          </Button>
        )}
      </Stack>
    </Paper>
  );
}

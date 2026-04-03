import { Box, Button, TextField, Typography, Grid, Paper } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useState } from "react";

const initialFieldErrors = {
  name: "",
  email: "",
  salary: "",
};

function createInitialFormData() {
  return {
    name: "",
    title: "",
    salary: "",
    phone: "",
    email: "",
    animal: "",
    startDate: "",
    location: "",
    department: "",
    skills: "",
  };
}

function validateField(name, value) {
  const trimmedValue = typeof value === "string" ? value.trim() : value;

  if (name === "name") {
    if (!trimmedValue) {
      return "Name is required.";
    }
  }

  if (name === "email") {
    if (!trimmedValue) {
      return "Email is required.";
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue);

    if (!isValidEmail) {
      return "Enter a valid email address.";
    }
  }

  if (name === "salary") {
    if (trimmedValue === "") {
      return "Salary is required.";
    }

    const numericSalary = Number(trimmedValue);

    if (Number.isNaN(numericSalary)) {
      return "Salary must be a number.";
    }

    if (numericSalary < 0) {
      return "Salary must be 0 or more.";
    }
  }

  return "";
}

export default function AddEmployee({ onAddEmployee }) {
  const [formData, setFormData] = useState(createInitialFormData);
  const [fieldErrors, setFieldErrors] = useState(initialFieldErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name in initialFieldErrors) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const nextFieldErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      salary: validateField("salary", formData.salary),
    };

    setFieldErrors(nextFieldErrors);

    if (Object.values(nextFieldErrors).some(Boolean)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await onAddEmployee(formData);

      if (result?.ok) {
        setFormData(createInitialFormData());
        setFieldErrors(initialFieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Box sx={{ width: "100%", maxWidth: 1100, mx: "auto", mt: 4, px: 2 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: { xs: 2, md: 3 },
          background:
            "linear-gradient(180deg, rgba(255, 250, 244, 0.96) 0%, rgba(247, 240, 230, 0.94) 100%)",
        }}
      >
        <Box
          sx={{
            mb: 4,
            p: { xs: 2.5, md: 3 },
            borderRadius: 2,
            background:
              "linear-gradient(135deg, rgba(24, 50, 47, 0.94), rgba(31, 111, 102, 0.88))",
            color: "#fffaf4",
          }}
        >
          <Typography
            variant="overline"
            sx={{ color: alpha("#fffaf4", 0.72), letterSpacing: "0.16em" }}
          >
            New Employee
          </Typography>
          <Typography variant="h3" sx={{ mt: 1 }}>
            Add a teammate
          </Typography>
          <Typography sx={{ mt: 1.5, maxWidth: 620, color: alpha("#fffaf4", 0.8) }}>
            Capture the essentials once and keep the directory current. This form feeds
            the employee cards and table view directly.
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="flex-start">
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                size="small"
                name="name"
                label="Name"
                value={formData.name}
                onChange={handleChange}
                error={Boolean(fieldErrors.name)}
                helperText={fieldErrors.name || " "}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                size="small"
                name="phone"
                label="Phone"
                value={formData.phone}
                onChange={handleChange}
                sx={{ flexGrow: 1 }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                size="small"
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={Boolean(fieldErrors.email)}
                helperText={fieldErrors.email || " "}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                size="small"
                name="animal"
                label="Animal"
                value={formData.animal}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                size="small"
                name="location"
                label="Location"
                value={formData.location}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                size="small"
                name="department"
                label="Department"
                value={formData.department}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                size="small"
                name="title"
                label="Title"
                value={formData.title}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                size="small"
                name="salary"
                label="Salary"
                type="number"
                value={formData.salary}
                onChange={handleChange}
                error={Boolean(fieldErrors.salary)}
                helperText={fieldErrors.salary || " "}
                slotProps={{ htmlInput: { min: 0 } }}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                size="small"
                name="skills"
                label="Skills (comma separated)"
                value={formData.skills}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                size="small"
                name="startDate"
                label="Start date"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                sx={{ flexGrow: 1 }}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3.5, display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Employee"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

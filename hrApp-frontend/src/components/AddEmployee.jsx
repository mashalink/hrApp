import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { useState } from "react";

export default function AddEmployee({ onAddEmployee }) {
  const [formData, setFormData] = useState({
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
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await onAddEmployee(formData);
    setFormData({
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
    });
  }

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Add New Employee
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="name"
                label="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="title"
                label="Title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="salary"
                label="Salary"
                type="number"
                value={formData.salary}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="phone"
                label="Phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="animal"
                label="Animal"
                value={formData.animal}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="startDate"
                label="Start date"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="location"
                label="Location"
                value={formData.location}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="department"
                label="Department"
                value={formData.department}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="skills"
                label="Skills (comma separated)"
                value={formData.skills}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button type="submit" variant="contained" size="large">
              Add Employee
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

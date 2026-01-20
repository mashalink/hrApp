import { Box, TextField, Typography, Stack } from "@mui/material";

export default function PersonFields({
  isEditing,
  formData,
  onChange,
  salary,
  phone,
  email,
  animal,
  location,
  department,
}) {
  return (
    <Stack spacing={1} sx={{ mt: 1 }}>
      {isEditing ? (
        <TextField
          size="small"
          label="Salary"
          type="number"
          name="salary"
          value={formData.salary}
          onChange={onChange}
        />
      ) : (
        <Typography variant="body2">
          <Box component="span" sx={{ fontWeight: 600 }}>Salary:</Box> {salary} €
        </Typography>
      )}

      <Typography variant="body2">
        <Box component="span" sx={{ fontWeight: 600 }}>Animal:</Box> {animal}
      </Typography>

      {isEditing ? (
        <TextField
          size="small"
          label="Location"
          name="location"
          value={formData.location}
          onChange={onChange}
        />
      ) : (
        <Typography variant="body2">
          <Box component="span" sx={{ fontWeight: 600 }}>Location:</Box> {location}
        </Typography>
      )}

      {isEditing ? (
        <TextField
          size="small"
          label="Department"
          name="department"
          value={formData.department}
          onChange={onChange}
        />
      ) : (
        <Typography variant="body2">
          <Box component="span" sx={{ fontWeight: 600 }}>Department:</Box> {department}
        </Typography>
      )}

      <Typography variant="body2">
        <Box component="span" sx={{ fontWeight: 600 }}>Email:</Box>{" "}
        <Box component="a" href={`mailto:${email}`} sx={{ color: "primary.main", textDecoration: "none" }}>
          {email}
        </Box>
      </Typography>

      <Typography variant="body2">
        <Box component="span" sx={{ fontWeight: 600 }}>Phone:</Box>{" "}
        <Box component="a" href={`tel:${phone}`} sx={{ color: "primary.main", textDecoration: "none" }}>
          {phone}
        </Box>
      </Typography>
    </Stack>
  );
}

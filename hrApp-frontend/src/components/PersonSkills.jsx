import { Box, Chip, Stack, TextField, Typography } from "@mui/material";

export default function PersonSkills({ isEditing, formData, onChange, skills }) {
  const skillsList = Array.isArray(skills) ? skills : [];

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
        Skills
      </Typography>

      {isEditing ? (
        <TextField
          fullWidth
          size="small"
          name="skillsText"
          value={formData.skillsText}
          onChange={onChange}
          placeholder="comma, separated, skills"
        />
      ) : skillsList.length ? (
        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
          {skillsList.map((s) => (
            <Chip key={s} label={s} size="small" />
          ))}
        </Stack>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No skills listed
        </Typography>
      )}
    </Box>
  );
}

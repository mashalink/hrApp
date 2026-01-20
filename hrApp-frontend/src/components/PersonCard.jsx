import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { getAnimalEmoji } from "../utils/animalEmoji";
import PersonHeader from "./PersonHeader";
import PersonActions from "./PersonActions";
import useEmployeeEditor from "../hooks/useEmployeeEditor";
import { getEmployeeFlags } from "../utils/calcEmployeeFlags";

export default function PersonCard({
  id,
  name,
  title,
  salary,
  phone,
  email,
  animal,
  location,
  department,
  skills,
  startDate,
  onUpdateEmployee,
}) {
  const { yearsWorked, isAnniversary, isProbation } = getEmployeeFlags(startDate);

  const {
    isEditing,
    isSaving,
    formData,
    saveMessage,
    startEditing,
    cancelEditing,
    handleFieldChange,
    saveChanges,
  } = useEmployeeEditor({ salary, location, department, skills }, onUpdateEmployee, id);

  const skillsList = Array.isArray(skills)
    ? skills
    : (skills ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

  return (
    <Card
      sx={{
        width: 360,
        borderRadius: 2,
        boxShadow: 4,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardContent sx={{ pb: 1 }}>
        <PersonHeader
          name={name}
          emoji={getAnimalEmoji(animal)}
          isAnniversary={isAnniversary}
          isProbation={isProbation}
          yearsWorked={yearsWorked}
        />

        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          {title}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Stack spacing={1} sx={{ color: "text.secondary" }}>
          <Typography variant="body2">
            <Box component="span" sx={{ fontWeight: 600, color: "text.primary" }}>
              Salary:
            </Box>{" "}
            {isEditing ? (
              <TextField
                name="salary"
                type="number"
                size="small"
                value={formData.salary}
                onChange={handleFieldChange}
                sx={{ width: 140, ml: 1 }}
                InputProps={{ inputProps: { min: 0 } }}
              />
            ) : (
              `${salary} €`
            )}
          </Typography>

          <Typography variant="body2">
            <Box component="span" sx={{ fontWeight: 600, color: "text.primary" }}>
              Department:
            </Box>{" "}
            {isEditing ? (
              <TextField
                name="department"
                size="small"
                value={formData.department}
                onChange={handleFieldChange}
                sx={{ width: "100%", maxWidth: 220, ml: 1 }}
              />
            ) : (
              department || "—"
            )}
          </Typography>

          <Typography variant="body2">
            <Box component="span" sx={{ fontWeight: 600, color: "text.primary" }}>
              Location:
            </Box>{" "}
            {isEditing ? (
              <TextField
                name="location"
                size="small"
                value={formData.location}
                onChange={handleFieldChange}
                sx={{ width: "100%", maxWidth: 220, ml: 1 }}
              />
            ) : (
              location || "—"
            )}
          </Typography>

          <Typography variant="body2">
            <Box component="span" sx={{ fontWeight: 600, color: "text.primary" }}>
              Email:
            </Box>{" "}
            <Box
              component="a"
              href={`mailto:${email}`}
              sx={{ color: "primary.main", textDecoration: "none" }}
            >
              {email}
            </Box>
          </Typography>

          <Typography variant="body2">
            <Box component="span" sx={{ fontWeight: 600, color: "text.primary" }}>
              Phone:
            </Box>{" "}
            <Box
              component="a"
              href={`tel:${phone}`}
              sx={{ color: "primary.main", textDecoration: "none" }}
            >
              {phone}
            </Box>
          </Typography>
        </Stack>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Skills
          </Typography>

          {isEditing ? (
            <TextField
              fullWidth
              size="small"
              name="skillsText"
              label="Skills (comma separated)"
              value={formData.skillsText}
              onChange={handleFieldChange}
            />
          ) : (
            <>
              {skillsList.length ? (
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
            </>
          )}
        </Box>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, mt: "auto" }}>
        <PersonActions
          isEditing={isEditing}
          isSaving={isSaving}
          saveMessage={saveMessage}
          onEdit={startEditing}
          onCancel={cancelEditing}
          onSave={saveChanges}
        />
      </CardActions>
    </Card>
  );
}

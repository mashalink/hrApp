import { alpha } from "@mui/material/styles";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
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
    fieldErrors,
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
        width: "100%",
        position: "relative",
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        background:
          "linear-gradient(180deg, rgba(255, 250, 244, 0.96) 0%, rgba(249, 243, 233, 0.95) 100%)",
        border: `1px solid ${alpha("#ffffff", 0.74)}`,
        boxShadow: "0 28px 54px rgba(24, 50, 47, 0.12)",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: "0 0 auto 0",
          height: 128,
          background:
            "linear-gradient(135deg, rgba(31, 111, 102, 0.18), rgba(196, 111, 68, 0.18))",
        },
      }}
    >
      <CardContent
        sx={{
          position: "relative",
          pb: 1,
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          <PersonHeader
            name={name}
            emoji={getAnimalEmoji(animal)}
            isAnniversary={isAnniversary}
            isProbation={isProbation}
            yearsWorked={yearsWorked}
          />

          {!isEditing && (
            <Box
              sx={{
                minWidth: 116,
                px: 1.6,
                py: 1.25,
                borderRadius: 2,
                textAlign: "right",
                backgroundColor: alpha("#fffaf4", 0.76),
                boxShadow: "inset 0 0 0 1px rgba(24, 50, 47, 0.05)",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                Salary
              </Typography>
              <Typography variant="h6">{salary} €</Typography>
            </Box>
          )}
        </Box>

        <Typography variant="subtitle1" color="text.secondary">
          {title || "Team member"}
        </Typography>

        {isEditing ? (
          <Stack spacing={1.5}>
            <TextField
              fullWidth
              name="salary"
              type="number"
              size="small"
              label="Salary"
              value={formData.salary}
              onChange={handleFieldChange}
              error={Boolean(fieldErrors.salary)}
              helperText={fieldErrors.salary || " "}
              slotProps={{ htmlInput: { min: 0 } }}
            />
            <TextField
              fullWidth
              name="department"
              size="small"
              label="Department"
              value={formData.department}
              onChange={handleFieldChange}
            />
            <TextField
              fullWidth
              name="location"
              size="small"
              label="Location"
              value={formData.location}
              onChange={handleFieldChange}
            />
          </Stack>
        ) : (
          <Stack direction="row" flexWrap="wrap" gap={1}>
            <Chip
              label={department || "No department"}
              size="small"
              sx={{
                backgroundColor: alpha("#1f6f66", 0.12),
                color: "primary.dark",
              }}
            />
            <Chip
              label={location || "No location"}
              size="small"
              sx={{
                backgroundColor: alpha("#c46f44", 0.12),
                color: "secondary.dark",
              }}
            />
          </Stack>
        )}

        <Box
          sx={{
            p: 2.25,
            borderRadius: 2,
            backgroundColor: alpha("#fffaf4", 0.72),
            boxShadow: "inset 0 0 0 1px rgba(24, 50, 47, 0.05)",
          }}
        >
          <Stack spacing={1.25}>
            <Typography variant="body2" color="text.secondary">
              <Box component="span" sx={{ color: "text.primary", fontWeight: 700 }}>
                Email:
              </Box>{" "}
              <Box
                component="a"
                href={`mailto:${email}`}
                sx={{
                  color: "primary.main",
                  textDecoration: "none",
                  wordBreak: "break-word",
                }}
              >
                {email}
              </Box>
            </Typography>

            <Typography variant="body2" color="text.secondary">
              <Box component="span" sx={{ color: "text.primary", fontWeight: 700 }}>
                Phone:
              </Box>{" "}
              {phone ? (
                <Box
                  component="a"
                  href={`tel:${phone}`}
                  sx={{ color: "primary.main", textDecoration: "none" }}
                >
                  {phone}
                </Box>
              ) : (
                "—"
              )}
            </Typography>
          </Stack>
        </Box>

        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.2 }}>
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
          ) : skillsList.length ? (
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {skillsList.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  size="small"
                  sx={{
                    backgroundColor: alpha("#18322f", 0.07),
                    color: "text.primary",
                  }}
                />
              ))}
            </Stack>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No skills listed
            </Typography>
          )}
        </Box>
      </CardContent>

      <CardActions sx={{ px: 3, pb: 3, pt: 0, mt: "auto" }}>
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

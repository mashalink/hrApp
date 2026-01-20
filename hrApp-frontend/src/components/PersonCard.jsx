import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { getAnimalEmoji } from "../utils/animalEmoji";

export default function PersonCardView({
  name,
  title,
  salary,
  phone,
  email,
  animal,
  location,
  department,
  skills,
  onEdit,
}) {
  const skillsList = Array.isArray(skills)
    ? skills
    : skills
        ?.split(",")
        .map((s) => s.trim())
        .filter(Boolean) || [];

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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {getAnimalEmoji(animal)}
          </Typography>
        </Box>

        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          {title}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Stack spacing={1} sx={{ color: "text.secondary" }}>
          <Typography variant="body2">
            <Box component="span" sx={{ fontWeight: 600, color: "text.primary" }}>
              Salary:
            </Box>{" "}
            {salary} €
          </Typography>

          <Typography variant="body2">
            <Box component="span" sx={{ fontWeight: 600, color: "text.primary" }}>
              Department:
            </Box>{" "}
            {department}
          </Typography>

          <Typography variant="body2">
            <Box component="span" sx={{ fontWeight: 600, color: "text.primary" }}>
              Location:
            </Box>{" "}
            {location}
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
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 600, color: "text.primary", mb: 1 }}
          >
            Skills
          </Typography>

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
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
        <Button size="small" variant="contained" onClick={onEdit}>
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}

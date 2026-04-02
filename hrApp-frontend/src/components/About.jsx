import { Box, Paper, Stack, Typography } from "@mui/material";

const About = () => {
  const principles = [
    {
      title: "Clear people data",
      description:
        "Keep core employee details, contact information, and skills easy to scan.",
    },
    {
      title: "Visible milestones",
      description:
        "Surface anniversaries and probation checkpoints before they turn into surprises.",
    },
    {
      title: "Quick maintenance",
      description:
        "Make updates inline instead of forcing users through heavy admin workflows.",
    },
  ];

  return (
    <Box sx={{ width: "100%", maxWidth: 1100, mx: "auto", mt: 4, px: 2 }}>
      <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: { xs: 4, md: 6 } }}>
        <Typography
          variant="overline"
          color="secondary.dark"
          sx={{ letterSpacing: "0.16em" }}
        >
          About
        </Typography>
        <Typography variant="h3" sx={{ mt: 1 }}>
          Built to make small-team HR data feel lighter.
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mt: 2, maxWidth: 720, lineHeight: 1.75 }}
        >
          This app brings employee details, reminders, and lightweight editing into a
          calmer interface. Instead of bouncing between forms and spreadsheets, the goal
          is to keep everything visible and quick to update.
        </Typography>

        <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mt: 4 }}>
          {principles.map((principle) => (
            <Paper
              key={principle.title}
              sx={{
                flex: 1,
                p: 3,
                borderRadius: 5,
                background:
                  "linear-gradient(180deg, rgba(255, 250, 244, 0.96), rgba(243, 234, 220, 0.94))",
              }}
            >
              <Typography variant="h6">{principle.title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1.2 }}>
                {principle.description}
              </Typography>
            </Paper>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
};

export default About;

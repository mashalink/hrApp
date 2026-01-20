import { Box, Paper, Typography } from "@mui/material";

const About = () => {
  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          About This HR App
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
          This HR application helps you add employees, review their profiles, and keep
          essential details in one place. Use the navigation above to add new hires or
          browse the directory.
        </Typography>
      </Paper>
    </Box>
  );
};

export default About;

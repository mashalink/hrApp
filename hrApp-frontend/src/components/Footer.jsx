import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        textAlign: "center",
        mt: 4,
        borderTop: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © 2025 WP25K Maria Link
      </Typography>
    </Box>
  );
}

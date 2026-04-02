import { Box, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        mt: 4,
        px: { xs: 2, md: 3 },
        py: 1.5,
        backgroundColor: alpha("#fffaf4", 0.72),
        borderTop: `1px solid ${alpha("#18322f", 0.08)}`,
        boxShadow: "0 -10px 24px rgba(24, 50, 47, 0.04)",
        backdropFilter: "blur(18px)",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={1}
        alignItems={{ xs: "flex-start", md: "center" }}
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="body2" color="text.secondary">
            © {currentYear} WP25K Maria Link
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          React • MUI • HR App
        </Typography>
      </Stack>
    </Box>
  );
}

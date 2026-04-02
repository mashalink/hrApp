import { Box, Typography } from "@mui/material";

export default function RouteFallback() {
  return (
    <Box
      aria-live="polite"
      aria-busy="true"
      sx={{
        minHeight: 240,
        display: "grid",
        placeItems: "center",
        px: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="h6" color="text.secondary">
        Loading...
      </Typography>
    </Box>
  );
}

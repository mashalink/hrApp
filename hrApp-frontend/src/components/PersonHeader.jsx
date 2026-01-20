import { Alert, Box, Typography } from "@mui/material";

export default function PersonHeader({
  name,
  emoji,
  isAnniversary,
  isProbation,
  yearsWorked,
}) {
  return (
    <Box sx={{ mb: 1 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          mb: 1,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {name}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {emoji}
        </Typography>
      </Box>

      {isAnniversary && (
        <Alert severity="success" sx={{ mt: 1 }}>
          🎉 Anniversary{typeof yearsWorked === "number" ? ` — ${yearsWorked} years worked!` : ""}{" "}
          Schedule recognition meeting.
        </Alert>
      )}

      {isProbation && (
        <Alert severity="warning" sx={{ mt: 1 }}>
          🔔 Probation review required. Schedule probation review.
        </Alert>
      )}
    </Box>
  );
}


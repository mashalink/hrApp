import { Box, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

const badgeBaseStyles = {
  px: 1.4,
  py: 0.8,
  borderRadius: 1,
  fontSize: "0.78rem",
  fontWeight: 700,
  letterSpacing: "0.02em",
};

export default function PersonHeader({
  name,
  emoji,
  isAnniversary,
  isProbation,
  yearsWorked,
}) {
  return (
    <Box sx={{ flex: 1 }}>
      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
        spacing={2}
      >
        <Box>
          <Typography variant="h5" sx={{ lineHeight: 1.05 }}>
            {name}
          </Typography>
        </Box>

        <Box
          sx={{
            flexShrink: 0,
            width: 52,
            height: 52,
            display: "grid",
            placeItems: "center",
            borderRadius: 2,
            backgroundColor: alpha("#fffaf4", 0.7),
            boxShadow: "inset 0 0 0 1px rgba(24, 50, 47, 0.05)",
            fontSize: "1.6rem",
          }}
        >
          {emoji}
        </Box>
      </Stack>

      <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 1.5 }}>
        {isAnniversary && (
          <Box
            sx={{
              ...badgeBaseStyles,
              color: "primary.dark",
              backgroundColor: alpha("#1f6f66", 0.12),
            }}
          >
            Anniversary{" "}
            {typeof yearsWorked === "number" ? `· ${yearsWorked} years` : ""}
          </Box>
        )}

        {isProbation && (
          <Box
            sx={{
              ...badgeBaseStyles,
              color: "secondary.dark",
              backgroundColor: alpha("#c46f44", 0.12),
            }}
          >
            Probation review pending
          </Box>
        )}

        {!isAnniversary && !isProbation && (
          <Box
            sx={{
              ...badgeBaseStyles,
              color: "text.secondary",
              backgroundColor: alpha("#18322f", 0.06),
            }}
          >
            No active reminders
          </Box>
        )}
      </Stack>
    </Box>
  );
}

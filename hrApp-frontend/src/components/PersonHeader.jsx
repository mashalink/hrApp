import { Alert, Box, Typography } from "@mui/material";

export default function PersonHeader({ name, isAnniversary, isProbation }) {
  return (
    <Box sx={{ mb: 1 }}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        {name}
      </Typography>

      {isAnniversary && (
        <Alert severity="success" sx={{ mt: 1 }}>
          Schedule recognition meeting.
        </Alert>
      )}

      {isProbation && (
        <Alert severity="warning" sx={{ mt: 1 }}>
          Schedule probation review.
        </Alert>
      )}
    </Box>
  );
}

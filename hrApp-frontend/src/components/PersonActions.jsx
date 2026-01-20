import { Box, Button, Stack, Typography } from "@mui/material";

export default function PersonActions({
  isEditing,
  isSaving,
  saveMessage,
  onEdit,
  onCancel,
  onSave,
}) {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, width: "100%" }}>
      <Stack direction="row" spacing={1}>
        {isEditing ? (
          <>
            <Button
              variant="contained"
              size="small"
              onClick={onSave}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save"}
            </Button>
            <Button
              variant="outlined"
              size="small"
              type="button"
              onClick={onCancel}
              disabled={isSaving}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button variant="contained" size="small" type="button" onClick={onEdit}>
            Edit
          </Button>
        )}
      </Stack>

      {saveMessage && (
        <Typography variant="caption" color="success.main">
          {saveMessage}
        </Typography>
      )}
    </Box>
  );
}

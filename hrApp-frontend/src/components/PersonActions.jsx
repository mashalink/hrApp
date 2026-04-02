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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: 1,
        width: "100%",
      }}
    >
      <Stack direction="row" spacing={1} justifyContent="flex-end">
        {isEditing ? (
          <>
            <Button
              variant="contained"
              size="small"
              onClick={onSave}
              disabled={isSaving}
              sx={{ minWidth: 94 }}
            >
              {isSaving ? "Saving..." : "Save"}
            </Button>
            <Button
              variant="outlined"
              size="small"
              type="button"
              onClick={onCancel}
              disabled={isSaving}
              sx={{ minWidth: 94 }}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            size="small"
            type="button"
            onClick={onEdit}
            sx={{ minWidth: 94 }}
          >
            Edit
          </Button>
        )}
      </Stack>

      {saveMessage && (
        <Typography variant="caption" color="success.main" textAlign="right">
          {saveMessage}
        </Typography>
      )}
    </Box>
  );
}

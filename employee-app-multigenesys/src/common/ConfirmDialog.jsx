import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const ConfirmDialog = ({ open, title, message, onConfirm, onCancel, confirmLabel = "Delete", confirmColor = "error" }) => (
  <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
    <DialogTitle fontWeight={600}>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{message}</DialogContentText>
    </DialogContent>
    <DialogActions sx={{ pb: 2, px: 3 }}>
      <Button onClick={onCancel} variant="outlined">
        Cancel
      </Button>
      <Button onClick={onConfirm} color={confirmColor} variant="contained" autoFocus>
        {confirmLabel}
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmDialog;

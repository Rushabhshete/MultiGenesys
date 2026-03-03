import { Snackbar, Alert } from "@mui/material";

const AppSnackbar = ({
  open,
  message,
  severity = "success",
  duration = 3000,
  position = { vertical: "top", horizontal: "right" },
  onClose,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={position}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AppSnackbar;
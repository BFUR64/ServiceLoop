import { IconButton, Snackbar } from "@mui/material";
import { setToast, useToast } from "../../hooks/useToast";
import CloseIcon from "@mui/icons-material/Close";
function Toast() {
  const [open, text] = useToast();

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => setToast(false)}
      message={text}
      action={
        <IconButton color="inherit" onClick={() => setToast(false)}>
          <CloseIcon />
        </IconButton>
      }
    />
  );
}

export default Toast;

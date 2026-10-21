import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useReloadPopup } from "../../hooks/useReloadPopup";

function ReloadPopup() {
  const open = useReloadPopup();

  return (
    <Dialog open={open}>
      <DialogTitle>Critical</DialogTitle>

      <DialogContent>
        A critical failure occurred. Please reload the website. If this
        persists, clear the website cache.
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={() => window.location.reload()}>
          Reload
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ReloadPopup;

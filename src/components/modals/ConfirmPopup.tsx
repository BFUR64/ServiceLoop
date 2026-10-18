import Dialog from "@mui/material/Dialog";
import {
  resolveConfirmationPopup,
  useConfirmPopup,
} from "../../hooks/useConfirmPopup";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function Confirm() {
  const text = useConfirmPopup();

  return (
    text !== null && (
      <Dialog open>
        <DialogTitle>Confirmation</DialogTitle>

        <DialogContent>{text}</DialogContent>

        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => resolveConfirmationPopup(true)}
          >
            Confirm
          </Button>
          <Button
            variant="contained"
            onClick={() => resolveConfirmationPopup(false)}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    )
  );
}

export default Confirm;

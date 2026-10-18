import Dialog from "@mui/material/Dialog";
import { useConfirmPopup } from "../../hooks/useConfirmPopup";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function Confirm() {
  const [text, setText] = useConfirmPopup();

  return (
    text !== null && (
      <Dialog open>
        <DialogTitle>Confirmation</DialogTitle>

        <DialogContent>{text}</DialogContent>

        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              dispatch(true);
              setText(null);
            }}
          >
            Confirm
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              dispatch(false);
              setText(null);
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    )
  );
}

function dispatch(confirmation: boolean) {
  document.dispatchEvent(
    new CustomEvent("app:confirm-response", {
      detail: {
        confirmed: confirmation,
      },
    }),
  );
}

export default Confirm;

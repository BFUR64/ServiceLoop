import Dialog from "@mui/material/Dialog";
import { useNotePopup } from "../../hooks/useNotePopup";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function Notes() {
  const [text, setText] = useNotePopup();

  return (
    text !== null && (
      <Dialog open>
        <DialogTitle>Note</DialogTitle>

        <DialogContent>{text}</DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={() => setText(null)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
  );
}

export default Notes;

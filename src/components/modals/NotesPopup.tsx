import Dialog from "@mui/material/Dialog";
import { useNotePopup } from "../../hooks/useNotePopup";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function Notes() {
  const [note, setNote] = useNotePopup();

  return (
    note !== null && (
      <Dialog open>
        <DialogTitle>Note</DialogTitle>

        <DialogContent>{note}</DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={() => setNote(null)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
  );
}

export default Notes;

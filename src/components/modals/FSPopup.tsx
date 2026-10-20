import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as directoryAccess from "../../fs-adapters/fs-api/DirectoryAccess";

function FSPopup() {
  const [update, setUpdate] = useState(0);

  const [firstStart, setFirstStart] = useState(true);

  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [directoryAvailable, setDirectoryAvailable] = useState<boolean | null>(
    null,
  );

  useEffect(() => {
    async function checkAuthorization() {
      if (directoryAccess.handleExists()) {
        const authorized = await directoryAccess.handleAuthorized();

        setAuthorized(authorized);

        if (authorized) {
          setDirectoryAvailable(await directoryAccess.directoryAvailable());
        }
      }

      setFirstStart(false);
    }

    checkAuthorization();
  }, [update]);

  if (!directoryAccess.supportsFileSystemAPI()) {
    return null;
  }

  if (firstStart) return null;

  if (authorized !== null && !authorized) {
    return (
      <Dialog open>
        <DialogTitle>Folder authorization required</DialogTitle>

        <DialogContent>
          Your folder authorization has expired or been revoked. Please
          reauthorize the folder to continue using the application.
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            onClick={async () => {
              await directoryAccess.authorizeHandle();
              setUpdate((v) => v + 1);
            }}
          >
            Reauthorize folder
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  if (authorized === null || !directoryAvailable) {
    return (
      <Dialog open>
        <DialogTitle>Choose a folder</DialogTitle>

        <DialogContent>
          Please choose a folder where your application data will be saved. Your
          data will be stored locally in the selected folder.
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            onClick={async () => {
              await directoryAccess.requestFolder();
              setUpdate((v) => v + 1);
            }}
          >
            Request folder
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default FSPopup;

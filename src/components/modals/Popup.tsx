import { useEffect, useState } from "react";
import {
  authorizeHandle,
  handleAuthorized,
  handleExists,
  supportsFileSystemAPI,
} from "../../utils/HandleState";
import * as fileSystem from "../../utils/FileSystem";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

function Popup() {
  const [update, setUpdate] = useState(0);

  const [firstStart, setFirstStart] = useState(true);

  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [directoryAvailable, setDirectoryAvailable] = useState<boolean | null>(
    null,
  );

  useEffect(() => {
    async function checkAuthorization() {
      if (handleExists()) {
        const authorized = await handleAuthorized();

        setAuthorized(authorized);

        if (authorized) {
          setDirectoryAvailable(await fileSystem.directoryAvailable());
        }
      }

      setFirstStart(false);
    }

    checkAuthorization();
  }, [update]);

  if (!supportsFileSystemAPI()) {
    return (
      <Dialog open>
        <DialogTitle>Browser not supported</DialogTitle>

        <DialogContent>
          Your browser does not support the File System Access API. Please use a
          compatible Chromium-based browser.
        </DialogContent>
      </Dialog>
    );
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
              await authorizeHandle();
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
              await fileSystem.requestFolder();
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

export default Popup;

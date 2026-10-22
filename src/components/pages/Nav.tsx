import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import { visuallyHidden } from "@mui/utils";
import { exportJSON, importJSON } from "../../fs-adapters/Json";
import { saveToIdb } from "../../state/ServiceDataStore";
import { useServiceData } from "../../hooks/useServiceData";
import { setNote } from "../../hooks/useNotePopup";
import { FILE_NAME } from "../../fs-adapters/fs-api/FileAccess";

interface NavProp {
  isPrimary: boolean;
}

export function Nav({ isPrimary = false }: NavProp) {
  const serviceData = useServiceData();

  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h1"
          sx={{ fontSize: "1.5rem", fontWeight: 500, flexGrow: 1 }}
        >
          ServiceLoop
        </Typography>
        {isPrimary && (
          <Stack direction="row" spacing={2}>
            <Tooltip title="Download JSON">
              <IconButton onClick={() => exportJSON(serviceData, FILE_NAME)}>
                <FileDownloadIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Upload JSON">
              <IconButton component="label">
                <FileUploadIcon />
                <input
                  type="file"
                  accept=".json"
                  style={visuallyHidden}
                  onChange={async (event) => {
                    const file = event.target.files?.[0];

                    if (file != null) {
                      saveToIdb(await importJSON(file));
                    }

                    setNote(`File "${file?.name}" imported!`);
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Settings">
              <IconButton onClick={() => navigate("/settings")}>
                <SettingsOutlined sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Nav;

import Stack from "@mui/material/Stack";
import BackButton from "../shared/BackButton";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { deleteDataFromIdb } from "../../state/ServiceDataStore";
import { confirmPopup } from "../../hooks/useConfirmPopup";
import {
  getHandleName,
  handleFolderSelection,
  SUPPORTS_FS,
} from "../../fs-adapters/fs-api/DirectoryAccess";
import { TextField } from "@mui/material";
import { setPaused } from "../../services/FileUpdater";

export function Settings() {
  const currentPreference =
    localStorage.getItem("theme-preference") ?? "system";

  const [themePreference, setThemePreference] = useState(currentPreference);

  const [directoryName, setDirectoryname] = useState(getHandleName());

  useEffect(() => {
    const setNewDirectoryName = () => {
      setDirectoryname(getHandleName());
    };

    document.addEventListener("app:folder-changed", setNewDirectoryName);

    return () => {
      document.removeEventListener("app:folder-changed", setNewDirectoryName);
    };
  }, []);

  return (
    <Stack spacing={2} sx={{ padding: 2 }}>
      <BackButton vehicle={undefined} />

      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <TextField
          value={`📁 ${directoryName}`}
          variant="outlined"
          disabled
        ></TextField>

        <Button
          variant="contained"
          disabled={!SUPPORTS_FS}
          onClick={async () => {
            const confirmed = await confirmPopup(
              "Are you sure you want to change directories? This will clear the CURRENT SESSION of your data!",
            );

            if (confirmed) {
              setPaused(true);
              await handleFolderSelection();
              setPaused(false);
            }
          }}
        >
          Change directory
        </Button>
      </Stack>

      <FormControl>
        <FormLabel>Theme</FormLabel>

        <RadioGroup
          row
          value={themePreference}
          onChange={(event) => {
            const selectedTheme = event.currentTarget.value;

            setThemePreference(selectedTheme);
            localStorage.setItem("theme-preference", selectedTheme);

            document.dispatchEvent(new Event("app:theme-changed"));
          }}
        >
          <FormControlLabel control={<Radio />} value="light" label="Light" />
          <FormControlLabel control={<Radio />} value="dark" label="Dark" />
          <FormControlLabel control={<Radio />} value="system" label="System" />
        </RadioGroup>
      </FormControl>

      <Box>
        <Button
          variant="contained"
          color="error"
          onClick={async () => {
            const confirmed = await confirmPopup(
              'This will delete ALL of the data you have. Make sure to back it up via "Download JSON". This CANNOT be undone.',
            );

            if (confirmed) {
              deleteDataFromIdb();
            }
          }}
        >
          Clear App Data
        </Button>
      </Box>
    </Stack>
  );
}

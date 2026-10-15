import Stack from "@mui/material/Stack";
import BackButton from "../items/BackButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { useEffect, useState } from "react";
import { getHandleName, requestFolder } from "../../services/DirectoryAccess";

export function Settings() {
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

  const currentPreference =
    localStorage.getItem("theme-preference") ?? "system";

  const [themePreference, setThemePreference] = useState(currentPreference);

  return (
    <Stack spacing={2} sx={{ padding: 2 }}>
      <BackButton vehicle={undefined} />

      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <TextField
          value={`📁 ${directoryName}`}
          variant="outlined"
          disabled
        ></TextField>

        <Button variant="contained" onClick={() => requestFolder()}>
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
    </Stack>
  );
}

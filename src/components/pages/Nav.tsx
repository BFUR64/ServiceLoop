import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";

interface NavProp {
  isPrimary: boolean;
}

export function Nav({ isPrimary = false }: NavProp) {
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
          <Tooltip title="Settings">
            <IconButton onClick={() => console.log("I am clicked!")}>
              <SettingsOutlined sx={{ color: "white" }} />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Nav;

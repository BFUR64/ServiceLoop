import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import type { VehicleData } from "../../utils/FileHandler";
import { useNavigate } from "react-router-dom";

interface BackButtonProp {
  vehicle: VehicleData | undefined;
}

function BackButton({ vehicle }: BackButtonProp) {
  const navigate = useNavigate();

  return (
    <Box>
      <Tooltip title="Go back to dashboard">
        <Button
          variant="contained"
          onClick={() =>
            vehicle != null
              ? navigate(`/dashboard/${vehicle.id}`)
              : navigate("/dashboard")
          }
        >
          <KeyboardBackspaceIcon />
        </Button>
      </Tooltip>
    </Box>
  );
}

export default BackButton;

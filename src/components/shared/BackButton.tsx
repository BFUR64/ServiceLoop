import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import type { VehicleData } from "../../models/ServiceData";
import { LAST_VEHICLE_SELECTED } from "../../models/PreferenceStore";

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
          onClick={() => {
            const lastVehicleSelected = localStorage.getItem(
              LAST_VEHICLE_SELECTED,
            );

            if (vehicle != null) {
              navigate(`/dashboard/${vehicle.id}`);
            } else if (lastVehicleSelected != null) {
              navigate(`/dashboard/${lastVehicleSelected}`);
            } else {
              navigate("/dashboard");
            }
          }}
        >
          <KeyboardBackspaceIcon />
        </Button>
      </Tooltip>
    </Box>
  );
}

export default BackButton;

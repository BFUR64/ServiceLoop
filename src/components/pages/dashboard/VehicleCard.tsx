import { updateVehicle } from "../../../state/DataStorage";
import type { VehicleData } from "../../../utils/FileHandler";
import { useNavigate } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { ChatOutlined, EditOutlined } from "@mui/icons-material";

interface VehicleProp {
  vehicleId: string | undefined;
  vehicleSelected: VehicleData | undefined;
}

function VehicleCard({ vehicleId, vehicleSelected }: VehicleProp) {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        border: 1,
        borderColor: theme.palette.mode === "dark" ? "grey.700" : "grey.400",
      }}
    >
      {vehicleId == undefined || vehicleSelected == undefined ? (
        <Typography>Select or add a new vehicle</Typography>
      ) : (
        <>
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Stack spacing={1}>
              <Typography>{vehicleSelected.nickname}</Typography>
              <Typography>
                {(vehicleSelected.make ?? "--") +
                  " " +
                  (vehicleSelected.model ?? "") +
                  " " +
                  (vehicleSelected.trim ?? "")}
              </Typography>
              <Typography>
                {(vehicleSelected.engine ?? "--") +
                  " | " +
                  (vehicleSelected.year ?? "--")}
              </Typography>
              <TextField
                label="km"
                variant="standard"
                value={vehicleSelected.currentOdometer}
                onChange={(event) => {
                  const value = Number(event.target.value);

                  if (Number.isFinite(value)) {
                    updateVehicle(vehicleId, { currentOdometer: value });
                  }
                }}
              />
            </Stack>
            <ButtonGroup variant="text" sx={{ alignItems: "start" }}>
              <Tooltip title="View note">
                <Button>
                  <ChatOutlined
                    sx={{
                      color:
                        theme.palette.mode === "dark" ? "white" : "grey.600",
                    }}
                  />
                </Button>
              </Tooltip>

              <Tooltip
                title="Edit item"
                onClick={() => navigate(`/vehicle/${vehicleId}`)}
              >
                <Button>
                  <EditOutlined
                    sx={{
                      color:
                        theme.palette.mode === "dark" ? "white" : "grey.600",
                    }}
                  />
                </Button>
              </Tooltip>
            </ButtonGroup>
          </Stack>
        </>
      )}
    </Paper>
  );
}

export default VehicleCard;

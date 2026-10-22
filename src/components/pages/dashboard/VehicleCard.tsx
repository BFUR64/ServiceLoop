import { updateVehicle } from "../../../state/ServiceDataMemory";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import ChatOutlined from "@mui/icons-material/ChatOutlined";
import EditOutlined from "@mui/icons-material/EditOutlined";
import { useTheme } from "@mui/material/styles";
import type { VehicleData } from "../../../models/ServiceData";
import { setNote } from "../../../hooks/useNotePopup";
import { normalizeOdometer } from "../../../utils/InputUtils";

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
                key={vehicleId}
                label="km"
                type="text"
                inputMode="numeric"
                variant="standard"
                value={vehicleSelected?.currentOdometer ?? 0}
                onChange={(event) => {
                  const value = normalizeOdometer(event.target.value);
                  saveDebouncedOdometer(vehicleId, value);
                }}
              />
            </Stack>
            <ButtonGroup variant="text" sx={{ alignItems: "start" }}>
              <Tooltip title="View note">
                <Button
                  onClick={() => {
                    const toPrint =
                      vehicleSelected.note === "" ||
                      vehicleSelected.note == null
                        ? "Add a note to see it here."
                        : vehicleSelected.note;

                    setNote(`${toPrint}`);
                  }}
                >
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

let timer: number | undefined = undefined;

function saveDebouncedOdometer(vId: string, odometer: number) {
  clearTimeout(timer);

  timer = setTimeout(() => {
    updateVehicle(vId, {
      currentOdometer: odometer,
    });
  }, 500);
}

export default VehicleCard;

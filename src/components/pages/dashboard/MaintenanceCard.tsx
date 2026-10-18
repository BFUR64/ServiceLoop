import "./MaintenanceCard.scss";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import type { IntervalTime } from "../../../models/ServiceData";
import { convertMsToDay, convertToMs } from "../../../utils/TimeCalculator";
import ActionCard from "./ActionCard";
import LinearProgress from "@mui/material/LinearProgress";

interface MaintenanceProp {
  vehicleId: string;
  itemId: string;
  name: string;
  note: string | null;
  dateServiced: string;
  mileageServiced: number;
  intervalKm: number | null;
  intervalTime: IntervalTime;
  currentOdometer: number;
  priority: boolean;
  progressBar: number;
}

function MaintenanceCard({
  vehicleId,
  itemId,
  name,
  note: itemNote,
  dateServiced,
  mileageServiced,
  intervalKm,
  intervalTime,
  currentOdometer,
  priority,
  progressBar,
}: MaintenanceProp) {
  const kmLeft =
    intervalKm !== null ? mileageServiced + intervalKm - currentOdometer : null;

  const timeLeft =
    intervalTime.value !== null
      ? Math.round(
          convertMsToDay(
            new Date(dateServiced).getTime() +
              convertToMs(intervalTime.unit, intervalTime.value) -
              Date.now(),
          ),
        )
      : null;

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
      <ActionCard
        vehicleId={vehicleId}
        itemId={itemId}
        itemNote={itemNote}
        itemType="maintenance"
        priority={priority}
        information={
          <Stack>
            <Typography>
              Due: {kmLeft !== null ? kmLeft + " km" : "--"} /{" "}
              {timeLeft !== null
                ? timeLeft + " " + returnFormattedTime(timeLeft)
                : "--"}
            </Typography>
            <Typography>{name}</Typography>
          </Stack>
        }
      />

      <LinearProgress
        variant="determinate"
        value={progressBar}
        sx={{
          m: 1,
          borderRadius: 1,
          height: 6,
          backgroundColor: "action.disabledBackground",

          "& .MuiLinearProgress-bar": {
            backgroundColor:
              progressBar >= 60
                ? "#5fbe00"
                : progressBar >= 25
                  ? "#cd7100"
                  : "#e80000",
          },
        }}
      />
    </Paper>
  );
}

function returnFormattedTime(value: number) {
  if (value == 1 || value == -1) {
    return "day";
  }

  return "days";
}

export default MaintenanceCard;

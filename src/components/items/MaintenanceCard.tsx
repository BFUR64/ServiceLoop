import * as Progress from "@radix-ui/react-progress";
import "./MaintenanceCard.scss";
import type { IntervalTime } from "../../utils/FileHandler";
import calculateDue from "../../utils/DueCalculator";
import { convertMsToDay, convertToMs } from "../../utils/TimeCalculator";
import ActionCard from "./ActionCard";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

interface MaintenanceProp {
  vehicleId: string;
  itemId: string;
  name: string;
  dateServiced: string;
  mileageServiced: number;
  intervalKm: number | null;
  intervalTime: IntervalTime;
  currentOdometer: number;
  priority: boolean;
}

function MaintenanceCard({
  vehicleId,
  itemId,
  name,
  dateServiced,
  mileageServiced,
  intervalKm,
  intervalTime,
  currentOdometer,
  priority,
}: MaintenanceProp) {
  const progressBar = calculateDue({
    dateServiced,
    mileageServiced,
    intervalKm,
    intervalTime,
    currentOdometer,
  });

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
      className={`maintenance-card maintenance-card--${returnUrgency(progressBar)}`}
    >
      <ActionCard
        vehicleId={vehicleId}
        itemId={itemId}
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

      <Progress.Root className="maintenance-card__progress" value={progressBar}>
        <Progress.Indicator
          className="maintenance-card__progress-indicator"
          style={{
            transform: `translateX(-${100 - progressBar}%)`,
          }}
        />
      </Progress.Root>
    </Paper>
  );
}

function returnFormattedTime(value: number) {
  if (value == 1 || value == -1) {
    return "day";
  }

  return "days";
}

type Urgency = "ok" | "warn" | "danger";

function returnUrgency(value: number): Urgency {
  if (value >= 60) return "ok";
  if (value >= 25) return "warn";
  return "danger";
}

export default MaintenanceCard;

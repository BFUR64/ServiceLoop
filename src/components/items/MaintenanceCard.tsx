import * as Progress from "@radix-ui/react-progress";
import "./MaintenanceCard.scss";
import type { IntervalTime } from "../../utils/FileHandler";
import calculateDue from "../../utils/DueCalculator";
import { convertMsToDay, convertToMs } from "../../utils/TimeCalculator";
import ActionCard from "./ActionCard";

interface MaintenanceProp {
  id: string;
  name: string;
  dateServiced: string;
  mileageServiced: number;
  intervalKm: number | null;
  intervalTime: IntervalTime;
  currentOdometer: number;
  priority: boolean;
}

function MaintenanceCard({
  id,
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

  return (
    <div
      className={`maintenance-card maintenance-card--${returnUrgency(progressBar)}`}
    >
      <ActionCard id={id} priority={priority} />

      <span className="maintenance-card__info">
        <span className="maintenance-card__meta">
          Due: {kmLeft !== null ? kmLeft + " km" : "--"} /{" "}
          {timeLeft !== null
            ? timeLeft + " " + returnFormattedTime(timeLeft)
            : "--"}
        </span>
        <span className="maintenance-card__title">{name}</span>
      </span>

      <Progress.Root className="maintenance-card__progress" value={progressBar}>
        <Progress.Indicator
          className="maintenance-card__progress-indicator"
          style={{
            transform: `translateX(-${100 - progressBar}%)`,
          }}
        />
      </Progress.Root>
    </div>
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

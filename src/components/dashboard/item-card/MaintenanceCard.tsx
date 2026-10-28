import { IntervalTime } from "@/models/service-data";
import { convertMsToDay, convertToMs } from "@/utils/time-calculator";
import { View } from "react-native";
import { Card, ProgressBar, Text } from "react-native-paper";
import ActionCard from "./ActionCard";

interface MaintenanceCardProp {
  vehicleId: string;
  itemId: string;
  name: string;
  itemNote: string | null;
  dateServiced: string;
  mileageServiced: number;
  intervalKm: number | null;
  intervalTime: IntervalTime;
  currentOdometer: number;
  priority: boolean;
  progressBar: number;
}

export default function MaintenanceCard({
  vehicleId,
  itemId,
  name,
  itemNote,
  dateServiced,
  mileageServiced,
  intervalKm,
  intervalTime,
  currentOdometer,
  priority,
  progressBar,
}: MaintenanceCardProp) {
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

  const STATUS_COLORS = {
    good: "#5fbe00",
    warning: "#cd7100",
    critical: "#e80000",
  };

  const progressColor =
    progressBar >= 0.6
      ? STATUS_COLORS.good
      : progressBar >= 0.25
        ? STATUS_COLORS.warning
        : STATUS_COLORS.critical;

  return (
    <Card mode="outlined">
      <ActionCard
        vehicleId={vehicleId}
        currentOdometer={currentOdometer}
        itemId={itemId}
        itemNote={itemNote}
        itemType={"task"}
        priority={priority}
        information={
          <View>
            <Text>
              Due: {kmLeft != null ? kmLeft + " km" : "--"} /{" "}
              {timeLeft != null
                ? timeLeft + " " + returnFormattedTime(timeLeft)
                : "--"}
            </Text>
            <Text>{name}</Text>
          </View>
        }
      />
      <View style={{ padding: 12, paddingTop: 0 }}>
        <ProgressBar
          progress={Math.max(0, progressBar)}
          color={progressColor}
        />
      </View>
    </Card>
  );
}

function returnFormattedTime(value: number) {
  if (value == 1 || value == -1) {
    return "day";
  }

  return "days";
}

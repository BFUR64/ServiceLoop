import { Card, Text } from "react-native-paper";
import ActionCard from "./ActionCard";

interface TaskCardProp {
  vehicleId: string;
  currentOdometer: number;
  itemId: string;
  itemName: string;
  itemNote: string | null;
  priority: boolean;
}

export function TaskCard({
  vehicleId,
  currentOdometer,
  itemId,
  itemNote,
  itemName,
  priority,
}: TaskCardProp) {
  return (
    <Card mode="outlined">
      <ActionCard
        vehicleId={vehicleId}
        currentOdometer={currentOdometer}
        itemId={itemId}
        itemNote={itemNote}
        itemType={"task"}
        priority={priority}
        information={<Text>{itemName}</Text>}
      />
    </Card>
  );
}

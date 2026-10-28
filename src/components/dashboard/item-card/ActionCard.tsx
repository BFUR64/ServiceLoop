import { ItemType } from "@/models/service-data";
import { ScrollView, View } from "react-native";
import { IconButton } from "react-native-paper";

interface ActionCardProp {
  vehicleId: string;
  currentOdometer: number;
  itemId: string;
  itemNote: string | null;
  itemType: ItemType;
  priority: boolean;
  information: React.ReactNode;
}

export default function ActionCard({
  vehicleId,
  currentOdometer,
  itemId,
  itemNote,
  itemType,
  information,
  priority,
}: ActionCardProp) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 6,
      }}
    >
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <IconButton style={{ margin: 0 }} icon={"check"} onPress={() => {}} />
        <ScrollView horizontal style={{ flex: 1 }}>
          {information}
        </ScrollView>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <IconButton
          style={{ margin: 0 }}
          icon={"comment-text"}
          onPress={() => {}}
        />
        <IconButton
          style={{ margin: 0 }}
          icon={"bookmark-outline"}
          onPress={() => {}}
        />
        <IconButton style={{ margin: 0 }} icon={"pencil"} onPress={() => {}} />
      </View>
    </View>
  );
}

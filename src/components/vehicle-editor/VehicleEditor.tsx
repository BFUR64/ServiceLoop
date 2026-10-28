import { Surface, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

interface VehicleEditorProp {
  vehicleId?: string;
}

export default function VehicleEditor({ vehicleId }: VehicleEditorProp) {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <Surface style={{ flex: 1 }}>
        <Text>Hello World!</Text>
        {vehicleId != null && <Text>Your id is: {vehicleId}</Text>}
      </Surface>
    </SafeAreaView>
  );
}

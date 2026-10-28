import { View } from "react-native";
import { Button, Text } from "react-native-paper";

interface AddItemButtonProp {
  vehicleId: string | undefined;
}

export default function AddItemButton({ vehicleId }: AddItemButtonProp) {
  return (
    vehicleId && (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text variant="titleMedium" style={{ fontWeight: 900 }}>
          Upcoming Work
        </Text>
        <Button mode="contained" onPress={() => {}}>
          Add Item
        </Button>
      </View>
    )
  );
}

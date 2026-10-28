import { VehicleData } from "@/models/service-data";
import { View } from "react-native";
import { Card, IconButton, Text, TextInput } from "react-native-paper";

interface VehicleInformationProp {
  vehicleId: string | undefined;
  vehicle: VehicleData | undefined;
}

export default function VehicleInformation({
  vehicleId,
  vehicle,
}: VehicleInformationProp) {
  return (
    <Card mode="outlined">
      <Card.Content style={{ padding: 16 }}>
        {vehicleId == null || vehicle == null ? (
          <Text>Select or add a new vehicle</Text>
        ) : (
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ gap: 16 }}>
              <Text>
                {(vehicle.make ?? "--") +
                  " " +
                  (vehicle.model ?? "") +
                  " " +
                  (vehicle.trim ?? "")}
              </Text>
              <Text>
                {(vehicle.engine ?? "--") +
                  (vehicle.year ? " | " + vehicle.year : "")}
              </Text>
              <View style={{ alignSelf: "flex-start", width: 150 }}>
                <TextInput
                  mode="outlined"
                  label="Odometer (km)"
                  value={String(vehicle.currentOdometer)}
                />
              </View>
            </View>
            <View>
              <IconButton
                mode="outlined"
                icon={"comment-text"}
                onPress={() => {}}
              />
              <IconButton mode="outlined" icon={"pencil"} onPress={() => {}} />
            </View>
          </View>
        )}
      </Card.Content>
    </Card>
  );
}

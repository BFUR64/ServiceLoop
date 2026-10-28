import { VehicleData } from "@/models/service-data";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Card, IconButton, Text, TextInput } from "react-native-paper";
import ViewNoteDialog from "../modals/ViewNoteDialog";

interface VehicleInformationProp {
  vehicleId: string | undefined;
  vehicle: VehicleData | undefined;
}

export default function VehicleInformation({
  vehicleId,
  vehicle,
}: VehicleInformationProp) {
  const router = useRouter();

  const [commentVisible, setCommentVisible] = useState(false);

  const onDismiss = () => {
    setCommentVisible(false);
  };

  return (
    <>
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
              <View style={{ gap: 8 }}>
                <IconButton
                  style={{ margin: 0 }}
                  mode="outlined"
                  icon={"comment-text"}
                  onPress={() => setCommentVisible(true)}
                />
                <IconButton
                  style={{ margin: 0 }}
                  mode="outlined"
                  icon={"pencil"}
                  onPress={() =>
                    router.navigate(`/vehicle-editor/${vehicleId}`)
                  }
                />
              </View>
            </View>
          )}
        </Card.Content>
      </Card>
      {vehicle != null && (
        <ViewNoteDialog
          text={vehicle.note}
          visible={commentVisible}
          onDismiss={onDismiss}
        />
      )}
    </>
  );
}

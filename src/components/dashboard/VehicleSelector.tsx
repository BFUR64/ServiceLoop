import { ServiceData, VehicleData } from "@/models/service-data";
import { useState } from "react";
import { Button, Menu, useTheme } from "react-native-paper";

interface VehcileSelectorProp {
  serviceData: ServiceData;
  vehicle: VehicleData | undefined;
  setVehicleId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function VehicleSelector({
  serviceData,
  vehicle,
  setVehicleId,
}: VehcileSelectorProp) {
  const theme = useTheme();

  const [visible, setVisible] = useState(false);

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={
        <Button
          mode="outlined"
          onPress={() => setVisible(true)}
          labelStyle={{ color: theme.colors.onSurface }}
          style={{
            backgroundColor: theme.colors.background,
          }}
        >
          {vehicle != null ? vehicle.nickname : "Select a Vehicle"}
        </Button>
      }
    >
      {serviceData.vehicles.map((vehicle) => (
        <Menu.Item
          key={vehicle.id}
          title={vehicle.nickname}
          onPress={() => {
            setVehicleId(vehicle.id);
            setVisible(false);
          }}
        />
      ))}
    </Menu>
  );
}

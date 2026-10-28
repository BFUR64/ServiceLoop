import { useRouter } from "expo-router";
import { IconButton } from "react-native-paper";

export default function AddVehicleButton() {
  const router = useRouter();

  return (
    <IconButton
      icon={"plus-circle"}
      onPress={() => router.navigate("/vehicle-editor")}
    />
  );
}

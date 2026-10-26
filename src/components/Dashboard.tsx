import { useRouter } from "expo-router";
import { Button, Surface, Text } from "react-native-paper";

// Future Terrance: Do not use /[id]. The stack history can remember. This is not a browser.
export default function Dashboard() {
  const router = useRouter();

  return (
    <Surface style={{ flex: 1, padding: "1rem" }}>
      <Text>Hello World!</Text>
      <Button mode="contained" onPress={() => router.navigate("/vehicles")}>
        Hello
      </Button>
    </Surface>
  );
}

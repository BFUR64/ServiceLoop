import { Stack, usePathname, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Platform, useColorScheme, View } from "react-native";
import {
  IconButton,
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  Surface,
} from "react-native-paper";

export default function RootLayout() {
  const pathname = usePathname();
  const isDashboard = pathname === "/";

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const isWeb = Platform.OS === "web";

  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const theme = mounted && isDark ? MD3DarkTheme : MD3LightTheme;

  return (
    <PaperProvider theme={theme}>
      <View
        style={[
          {
            flex: 1,
          },
          isWeb && {
            width: "100%",
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        <Surface
          style={[
            {
              flex: 1,
            },
            isWeb && {
              width: 750,
              alignSelf: "center",
            },
          ]}
        >
          <Stack
            screenOptions={{
              headerTintColor: theme.colors.onSurface,
              headerStyle: { backgroundColor: theme.colors.background },
              headerShadowVisible: false,
              headerRight: () =>
                isDashboard &&
                mounted && (
                  <IconButton
                    icon="cog"
                    onPress={() => router.navigate("/settings")}
                  />
                ),
            }}
          >
            <Stack.Screen name="index" options={{ title: "ServiceLoop" }} />

            <Stack.Screen
              name="vehicle-editor/index"
              options={{ title: "Vehicle Edit" }}
            />

            <Stack.Screen
              name="vehicle-editor/[id]"
              options={{ title: "Vehicle Edit" }}
            />

            <Stack.Screen
              name="settings/index"
              options={{ title: "Settings" }}
            />
          </Stack>
        </Surface>
      </View>
    </PaperProvider>
  );
}

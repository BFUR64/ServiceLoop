import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState, type ReactNode } from "react";
import { THEME_PREFERENCE } from "../models/PreferenceStore";

type ThemePreference = "light" | "dark" | "system";

export default function AppThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [themePreference, setThemePreference] =
    useState<ThemePreference>(getThemePreference());

  useEffect(() => {
    const handlePreferenceChange = () => {
      setThemePreference(getThemePreference());
    };

    document.addEventListener("app:theme-changed", handlePreferenceChange);

    return () => {
      document.removeEventListener("app:theme-changed", handlePreferenceChange);
    };
  }, []);

  const theme = createTheme({
    palette: {
      mode:
        themePreference === "system"
          ? prefersDarkMode
            ? "dark"
            : "light"
          : themePreference,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

function getThemePreference(): ThemePreference {
  const preference = localStorage.getItem(THEME_PREFERENCE);

  if (
    preference === "light" ||
    preference === "dark" ||
    preference === "system"
  ) {
    return preference;
  }

  return "system";
}

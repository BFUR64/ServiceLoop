import { useMemo, type ReactNode } from "react";
import {
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";

export default function AppThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
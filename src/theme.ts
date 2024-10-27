"use client";
import { createTheme, type ThemeOptions } from "@mui/material/styles";

const commonThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: "var(--notosanskr)",
  },
};

const lightTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: "light",
  },
});

const darkTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: "dark",
  },
});

export { lightTheme, darkTheme };

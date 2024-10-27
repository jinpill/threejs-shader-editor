"use client";

import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import { useCustomizingStore } from "@/stores/useCustomizingStore";
import { lightTheme, darkTheme } from "@/theme";
import { useEffect } from "react";

type InitializerProps = {
  children?: React.ReactNode;
};

const Initializer = (props: InitializerProps) => {
  const { theme, setTheme, initTheme } = useCustomizingStore();

  useEffect(() => {
    initTheme();
    document.body.style.opacity = "1";
  }, [initTheme, setTheme]);

  useEffect(() => {
    const html = document.querySelector("html");
    if (!html) return;

    if (theme === "dark") html.classList.add("dark");
    else html.classList.remove("dark");
  }, [theme]);

  return (
    <MuiThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      {props.children}
    </MuiThemeProvider>
  );
};

export default Initializer;

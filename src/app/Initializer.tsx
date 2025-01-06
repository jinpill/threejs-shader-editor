"use client";

import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import { useCustomizingStore } from "@/stores/useCustomizingStore";
import { lightTheme, darkTheme } from "@/theme";
import { useEffect } from "react";

type InitializerProps = {
  children?: React.ReactNode;
};

const Initializer = (props: InitializerProps) => {
  const { theme, displayScale, initTheme, initDisplayScale } = useCustomizingStore();

  useEffect(() => {
    initTheme();
    initDisplayScale();
    document.body.style.opacity = "1";
  }, [initTheme, initDisplayScale]);

  useEffect(() => {
    const html = document.querySelector("html");
    if (!html) return;

    if (theme === "dark") {
      html.classList.add("dark");
      document.body.setAttribute("data-theme", "dark");
    } else {
      html.classList.remove("dark");
      document.body.setAttribute("data-theme", "light");
    }
  }, [theme]);

  useEffect(() => {
    const html = document.querySelector("html");
    if (!html) return;

    html.style.fontSize = `${displayScale}%`;
  }, [displayScale]);

  return (
    <MuiThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      {props.children}
    </MuiThemeProvider>
  );
};

export default Initializer;

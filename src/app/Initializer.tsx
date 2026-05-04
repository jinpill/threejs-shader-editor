"use client";

import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import { useCustomizingStore } from "@/stores/useCustomizingStore";
import { lightTheme, darkTheme } from "@/theme";
import { useEffect } from "react";
import { useDialogStore, type DialogStore } from "@/stores/useDialogStore";
import { useToastStore, type ToastStore } from "@/stores/useToastStore";

declare global {
  interface Window {
    dialog: Dialog;
    toast: Toast;
  }

  type Dialog = {
    alert: DialogStore["alert"];
    confirm: DialogStore["confirm"];
  };

  type Toast = {
    add: ToastStore["addToast"];
    update: ToastStore["updateToast"];
    remove: ToastStore["removeToast"];
  };

  const dialog: Dialog;
  const toast: Toast;
}

type InitializerProps = {
  children?: React.ReactNode;
};

const Initializer = (props: InitializerProps) => {
  const { theme, displayScale, initTheme, initDisplayScale } = useCustomizingStore();
  const { alert, confirm } = useDialogStore();
  const { addToast, updateToast, removeToast } = useToastStore();

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

    const fontSize = (16 * displayScale) / 100;
    html.style.fontSize = `${fontSize}px`;
  }, [displayScale]);

  useEffect(() => {
    window.dialog = {
      alert,
      confirm,
    };

    window.toast = {
      add: addToast,
      update: updateToast,
      remove: removeToast,
    };
  }, [alert, confirm, addToast, updateToast, removeToast]);

  return (
    <MuiThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      {props.children}
    </MuiThemeProvider>
  );
};

export default Initializer;

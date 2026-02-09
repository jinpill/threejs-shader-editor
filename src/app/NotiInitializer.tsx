"use client";

import { useEffect } from "react";
import { useDialogStore, type DialogStore } from "@/stores/useDialogStore";
import { useToastStore, type ToastStore } from "@/stores/useToastStore";

declare global {
  interface Window {
    noti: Noti;
  }

  type Noti = {
    alert: DialogStore["alert"];
    confirm: DialogStore["confirm"];
    toast: ToastStore["addToast"];
  };

  const noti: Noti;
}

const NotiInitializer = () => {
  const { alert, confirm } = useDialogStore();
  const { addToast } = useToastStore();

  useEffect(() => {
    window.noti = {
      alert,
      confirm,
      toast: addToast,
    };
  }, [alert, confirm, addToast]);

  return null;
};

export default NotiInitializer;

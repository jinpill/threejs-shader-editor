"use client";

import MountAnimation from "@/components/MountAnimation";
import Dialog from "@/components/Dialog";
import { useDialogStore } from "../stores/useDialogStore";
import style from "./DialogManager.module.scss";
import { useEffect } from "react";

const DialogManager = () => {
  const { dialogProps, isDialogVisible, alert } = useDialogStore();

  useEffect(() => {
    window.test = {
      alert,
    };
  }, []);

  return (
    <div className={style.dialogArea}>
      <MountAnimation isVisible={isDialogVisible}>
        <Dialog {...dialogProps} />
      </MountAnimation>
    </div>
  );
};

export default DialogManager;

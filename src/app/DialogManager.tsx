"use client";

import MountAnimation from "@/components/MountAnimation";
import Dialog from "@/components/Dialog";
import { useDialogStore } from "../stores/useDialogStore";
import style from "./DialogManager.module.scss";

const DialogManager = () => {
  const { dialogProps, isDialogVisible } = useDialogStore();

  return (
    <div className={style.dialogArea}>
      <MountAnimation isVisible={isDialogVisible}>
        <Dialog {...dialogProps} />
      </MountAnimation>
    </div>
  );
};

export default DialogManager;

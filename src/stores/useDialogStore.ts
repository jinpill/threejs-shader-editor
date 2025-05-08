import { create } from "zustand";
import type { DialogProps, DialogType } from "@/components/Dialog";
import type { IconName } from "@/components/Icon";

export type DialogStore = {
  dialogProps: DialogProps<any>;
  isDialogVisible: boolean;
  hideDialog: () => void;

  alert: (options: AlertOptions) => Promise<void>;
  confirm: (options: ConfirmOptions) => Promise<boolean>;
};

export type AlertOptions = {
  type?: DialogType;
  title: string;
  message: string;
  buttons?: [DialogButtonOption];
  isDanger?: boolean;
};

export type ConfirmOptions = {
  type?: DialogType;
  title: string;
  message: string;
  buttons?: [DialogButtonOption, DialogButtonOption?];
  isDanger?: boolean;
};

export type DialogButtonOption = {
  label?: string;
  icon?: IconName;
};

export const useDialogStore = create<DialogStore>((set, get) => ({
  dialogProps: {
    type: "info",
    title: "",
    message: "",
    defaultValue: undefined,
    defaultFocus: 0,
    buttons: [
      {
        icon: "check",
        type: "primary",
        label: "OK",
        value: undefined,
      },
    ],
    callback: () => {},
  },
  isDialogVisible: false,
  hideDialog: () => {
    set({ isDialogVisible: false });
  },

  alert: (options) => {
    const { hideDialog } = get();
    const { promise, resolve } = Promise.withResolvers<void>();

    const dialogProps: DialogProps<void> = {
      type: options.type ?? "info",
      title: options.title,
      message: options.message,
      defaultValue: undefined,
      defaultFocus: 0,
      buttons: [
        {
          icon: options.buttons?.[0].icon ?? "check",
          type: options.isDanger ? "danger" : "primary",
          label: options.buttons?.[0].label ?? "OK",
          value: undefined,
        },
      ],
      callback: (value) => {
        resolve(value);
        hideDialog();
      },
    };

    set({
      dialogProps,
      isDialogVisible: true,
    });
    return promise;
  },
  confirm: (options) => {
    const { hideDialog } = get();
    const { promise, resolve } = Promise.withResolvers<boolean>();

    const dialogProps: DialogProps<boolean> = {
      type: options.type ?? "info",
      title: options.title,
      message: options.message,
      defaultValue: false,
      defaultFocus: options.isDanger ? 0 : 1,
      buttons: [
        {
          icon: options.buttons?.[1]?.icon ?? "close",
          type: "secondary",
          label: options.buttons?.[1]?.label ?? "No",
          value: false,
        },
        {
          icon: options.buttons?.[0].icon ?? "check",
          type: options.isDanger ? "danger" : "primary",
          label: options.buttons?.[0].label ?? "Yes",
          value: true,
        },
      ],
      callback: (value) => {
        resolve(value);
        hideDialog();
      },
    };

    set({
      dialogProps,
      isDialogVisible: true,
    });
    return promise;
  },
}));

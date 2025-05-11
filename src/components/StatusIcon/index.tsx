"use client";

import { useMemo } from "react";
import classNames from "classnames";
import Icon, { type IconName } from "@/components/Icon";
import style from "./style.module.scss";

export type StatusIconProps = {
  status: IconStatus;
  className?: string;
};

export type IconStatus = "info" | "success" | "warning" | "error";

const StatusIcon = (props: StatusIconProps) => {
  const icon: IconName = useMemo(() => {
    if (props.status === "info") return "info";
    if (props.status === "success") return "check_circle";
    if (props.status === "warning") return "warning_amber";
    return "error_outline";
  }, [props.status]);

  return (
    <div className={classNames(style.statusIcon, style[props.status], props.className)}>
      <Icon
        className={style.icon}
        style={{
          top: props.status === "warning" ? "-0.125rem" : "0",
        }}
        icon={icon}
        type="outlined"
      />
    </div>
  );
};

export default StatusIcon;

import { useMemo } from "react";
import classNames from "classnames";
import type { MaterialIcon } from "material-icons";
import style from "./style.module.scss";

export type IconProps = {
  icon: IconName;
  type?: IconType;
  className?: string;
};

export type IconName = MaterialIcon;
export type IconType = "filled" | "outlined" | "round" | "sharp" | "two-tone";

const Icon = (props: IconProps) => {
  const className = useMemo(() => {
    const type = props.type ?? "filled";
    let className = "material-icons";
    if (type !== "filled") className += `-${type}`;
    return className;
  }, [props.type]);

  return (
    <div className={classNames(style.icon, className, props.className)}>{props.icon}</div>
  );
};

export default Icon;

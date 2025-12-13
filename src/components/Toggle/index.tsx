import { useEffect, useState } from "react";
import classNames from "classnames";
import useCommonSize, { type CommonSize } from "@/hooks/useCommonSize";
import style from "./style.module.scss";

export type ToggleProps = {
  size?: ToggleSize;
  value?: boolean;
  isDisabled?: boolean;
  onChange?: (value: boolean) => void;
  className?: string;
};

export type ToggleSize = CommonSize;

const Toggle = (props: ToggleProps) => {
  const size = useCommonSize(props.size);
  const [value, setValue] = useState(props.value ?? false);

  const handleClick = () => {
    const newValue = !value;
    if (props.onChange) props.onChange(newValue);
    else setValue(newValue);
  };

  useEffect(() => {
    setValue(props.value ?? false);
  }, [props.value]);

  return (
    <button
      className={classNames(style.toggle, props.className)}
      disabled={props.isDisabled}
      onClick={handleClick}
    >
      Toggle {value ? "On" : "Off"}
    </button>
  );
};

export default Toggle;

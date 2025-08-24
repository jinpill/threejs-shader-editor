import { useEffect, useState } from "react";
import classNames from "classnames";
import style from "./style.module.scss";

export type RadioProps = {
  size?: RadioSize;
  value?: boolean;
  isDisabled?: boolean;
  onChange?: (value: boolean) => void;
  className?: string;
};

export type RadioSize = "small" | "large";

const Radio = (props: RadioProps) => {
  const [value, setValue] = useState(props.value ?? false);

  const handleClick = () => {
    const newValue = !value;
    if (props.onChange) {
      props.onChange(newValue);
    } else {
      setValue(newValue);
    }
  };

  useEffect(() => {
    if (typeof props.value !== "boolean") return;
    setValue(props.value);
  }, [props.value]);

  return (
    <button
      className={classNames(style.radio, style[props.size ?? "small"], {
        [style.checked]: value,
      })}
      disabled={props.isDisabled}
      onClick={handleClick}
    />
  );
};

export default Radio;

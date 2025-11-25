import { useEffect, useState } from "react";
import classNames from "classnames";
import useCommonSize, { type CommonSize } from "@/hooks/useCommonSize";
import style from "./style.module.scss";

export type RadioProps = {
  size?: RadioSize;
  value?: boolean;
  isDisabled?: boolean;
  onChange?: (value: boolean) => void;
  className?: string;
};

export type RadioSize = CommonSize;

const Radio = (props: RadioProps) => {
  const [value, setValue] = useState(props.value ?? false);
  const size = useCommonSize(props.size);

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
      className={classNames(style.radio, style[size], {
        [style.checked]: value,
      })}
      disabled={props.isDisabled}
      onClick={handleClick}
    />
  );
};

export default Radio;

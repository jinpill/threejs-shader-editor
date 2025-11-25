import { useEffect, useState } from "react";
import classNames from "classnames";

import Icon from "@/components/Icon";
import useCommonSize, { type CommonSize } from "@/hooks/useCommonSize";
import style from "./style.module.scss";

export type CheckBoxProps = {
  size?: CheckBoxSize;
  value?: boolean;
  isDisabled?: boolean;
  onChange?: (value: boolean) => void;
  className?: string;
};

export type CheckBoxSize = CommonSize;

const CheckBox = (props: CheckBoxProps) => {
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
      className={classNames(style.checkBox, style[size], {
        [style.checked]: value,
      })}
      disabled={props.isDisabled}
      onClick={handleClick}
    >
      <Icon className={style.icon} icon="check" />
    </button>
  );
};

export default CheckBox;

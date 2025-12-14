import { useEffect, useState } from "react";
import classNames from "classnames";
import Icon from "@/components/Icon";
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
    <div
      className={classNames(style.toggleWrapper, style[size], props.className, {
        [style.active]: value,
      })}
    >
      <button className={style.toggle} disabled={props.isDisabled} onClick={handleClick}>
        <div className={style.knob}>
          <Icon icon="check" className={style.icon} />
          <Icon icon="clear" className={style.icon} />
        </div>
      </button>
    </div>
  );
};

export default Toggle;

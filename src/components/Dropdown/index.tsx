import classNames from "classnames";
import Button, { type ButtonSize } from "@/components/Button";
import Icon from "@/components/Icon";
import style from "./style.module.scss";

export type DropdownProps<V extends string | number> = {
  size?: DropdownSize;
  value?: V;
  options?: DropdownOption<V>[];
  placeholder?: string;
  isDisabled?: boolean;
  onChange?: (value: V) => void;
  className?: string;
};

export type DropdownOption<V extends string | number> = {
  value: V;
  label: string;
};

export type DropdownSize = ButtonSize;

const Dropdown = <V extends string | number>(props: DropdownProps<V>) => {
  const size = props.size ?? "small";
  const options = props.options ?? [];
  const option = options.find((option) => option.value === props.value);
  const isDisabled = props.isDisabled || options.length === 0;

  const handleClick = () => {
    console.log("리스트 표시");
  };

  return (
    <Button
      className={classNames(style.dropdown, props.className, style[size])}
      type="secondary"
      size={size}
      isDisabled={isDisabled}
      onClick={handleClick}
    >
      <div className={style.label}>
        {option?.label ?? props.placeholder ?? "Select an option"}
      </div>
      <Icon className={style.icon} icon="keyboard_arrow_down" />
    </Button>
  );
};

export default Dropdown;

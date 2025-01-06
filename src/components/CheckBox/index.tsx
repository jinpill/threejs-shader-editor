import classNames from "classnames";
import Checkbox from "@mui/material/Checkbox";
import style from "./style.module.scss";

export type CheckBoxProps = {
  value?: boolean;
  onChange?: (value: boolean) => void;
  className?: string;
};

const CheckBox = (props: CheckBoxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange?.(e.target.checked);
  };

  return (
    <Checkbox
      className={classNames(style.checkBox, props.className)}
      checked={props.value}
      onChange={handleChange}
    />
  );
};

export default CheckBox;

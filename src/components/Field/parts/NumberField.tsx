import classNames from "classnames";
import FieldBase from "../utils/FieldBase";
import style from "./NumberField.module.scss";

export type NumberFieldProps = {
  className?: string;
  style?: React.CSSProperties;
};

const NumberField = (props: NumberFieldProps) => {
  return <FieldBase className={props.className} style={props.style}></FieldBase>;
};

export default NumberField;

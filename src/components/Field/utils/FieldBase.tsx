import classNames from "classnames";
import Paper from "@mui/material/Paper";
import style from "./FieldBase.module.scss";

export type FieldBaseProps = {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

const FieldBase = (props: FieldBaseProps) => (
  <Paper className={classNames(style.fieldBase, props.className)} style={props.style}>
    {props.children}
  </Paper>
);

export default FieldBase;

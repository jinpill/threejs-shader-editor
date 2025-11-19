import style from "../../style.module.scss";

type FieldLabelProps = {
  id: string;
  children?: React.ReactNode;
};

const FieldLabel = (props: FieldLabelProps) => (
  <label
    className={style.label}
    htmlFor={props.id}
    onClick={(event) => event.stopPropagation()}
  >
    {props.children}
  </label>
);

export default FieldLabel;

import style from "../../style.module.scss";

const FieldLabel = (props: React.PropsWithChildren) => (
  <div className={style.label}>{props.children}</div>
);

export default FieldLabel;

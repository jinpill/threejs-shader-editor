import style from "../../style.module.scss";

const Unit = (props: React.PropsWithChildren) => (
  <span className={style.unit}>{props.children}</span>
);

export default Unit;

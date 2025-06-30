import style from "./style.module.scss";

export type ContainerProps = {
  minHeight?: string;
  theme?: "light" | "dark";
  children?: React.ReactNode;
};

const Container = (props: ContainerProps) => (
  <div
    data-theme={props.theme ?? "light"}
    className={style.darkMode}
    style={{ minHeight: props.minHeight ?? "116px" }}
  >
    {props.children}
  </div>
);

export default Container;

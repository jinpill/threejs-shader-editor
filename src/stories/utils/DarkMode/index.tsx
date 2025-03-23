import style from "./style.module.scss";

const DarkMode = (props: React.PropsWithChildren) => (
  <div data-theme="dark" className={style.darkMode}>
    {props.children}
  </div>
);

export default DarkMode;

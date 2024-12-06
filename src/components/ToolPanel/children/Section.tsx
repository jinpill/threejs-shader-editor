import classNames from "classnames";
import style from "../style.module.scss";

export type ToolPanelSectionProps = {
  title?: string;

  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

const ToolPanelSection = (props: ToolPanelSectionProps) => {
  return (
    <div className={classNames(style.section, props.className)} style={props.style}>
      {props.title && (
        <header className={style.header}>
          <div className={style.title}>{props.title}</div>
        </header>
      )}
      <div className={style.contents}>{props.children}</div>
    </div>
  );
};

export default ToolPanelSection;

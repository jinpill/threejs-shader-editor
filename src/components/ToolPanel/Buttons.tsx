import ToolPanelSection from "./Section";
import style from "./style.module.scss";

export type ToolPanelButtonsProps = {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

const ToolPanelButtons = (props: ToolPanelButtonsProps) => {
  return (
    <ToolPanelSection className={props.className} style={props.style}>
      <div className={style.buttons}>{props.children}</div>
    </ToolPanelSection>
  );
};

export default ToolPanelButtons;

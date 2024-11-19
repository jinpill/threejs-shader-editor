import { Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import style from "./style.module.scss";

export type ToolPanelProps = {
  title: string;
  onClose?: () => void;
  children?: React.ReactNode;
};

const ToolPanel = (props: ToolPanelProps) => {
  return (
    <Paper className={style.toolPanel}>
      <header className={style.header}>
        <div className={style.title}>{props.title}</div>

        <button className={style.closeButton} tabIndex={-1} onClick={props.onClose}>
          <CloseIcon fontSize="small" />
        </button>
      </header>

      <div className={style.contents}>{props.children}</div>
    </Paper>
  );
};

export default ToolPanel;

import React from "react";
import classNames from "classnames";
import Paper from "@mui/material/Paper";
import { InputLabel } from "@mui/material";
import style from "./style.module.scss";

type EditorProps = {
  label: string;
  value: string;
  onChange: (value: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
};

/**
 * - `--width` textarea의 너비를 지정
 * - `--height` textarea의 높이를 지정
 */
const Editor = React.forwardRef<HTMLTextAreaElement, EditorProps>((props, ref) => {
  return (
    <div className={classNames(style.editor, props.className)}>
      <InputLabel
        sx={{
          fontSize: "0.875rem",
        }}
      >
        {props.label}
      </InputLabel>
      <Paper variant="outlined" className={style.paperBox}>
        <textarea
          ref={ref}
          value={props.value}
          onChange={(e) => {
            props.onChange(e.target.value, e);
          }}
        />
      </Paper>
    </div>
  );
});

Editor.displayName = "Editor";
export default Editor;

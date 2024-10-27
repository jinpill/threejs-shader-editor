import React, {
  useCallback,
  useLayoutEffect,
  useRef,
  useImperativeHandle,
} from "react";
import classNames from "classnames";
import Paper from "@mui/material/Paper";
import { InputLabel } from "@mui/material";
import style from "./style.module.scss";

export type EditorProps = {
  label: string;
  value: string;
  onChange: (
    value: string,
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  className?: string;
};

/**
 * - `--width` textarea의 너비를 지정
 * - `--height` textarea의 높이를 지정
 */
const Editor = React.forwardRef<HTMLTextAreaElement, EditorProps>(
  (props, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useImperativeHandle(
      ref,
      () => {
        return textareaRef.current!;
      },
      []
    );

    const cursorPosition = useRef<number>(0);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.ctrlKey && e.key === "/") {
          e.preventDefault();
          const textarea = e.currentTarget;
          const { selectionStart, selectionEnd, value } = textarea;

          const beforeCursor = value.lastIndexOf("\n", selectionStart - 1) + 1;
          const afterCursor = value.indexOf("\n", selectionEnd);
          const lineEnd = afterCursor === -1 ? value.length : afterCursor;

          const line = value.slice(beforeCursor, lineEnd);
          const hasComment = line.trim().startsWith("//");
          const hasCommentWithSpace = line.trim().startsWith("// ");
          const newLine = hasCommentWithSpace
            ? line.replace(/^(\s*)\/\/\s/, "$1")
            : hasComment
            ? line.replace(/^(\s*)\/\/s?/, "$1")
            : line.replace(/^(\s*)/, "$1// ");

          const newValue =
            value.slice(0, beforeCursor) + newLine + value.slice(lineEnd);

          let newCursorPosition = selectionStart;
          if (!hasComment) {
            newCursorPosition = selectionStart + 3;
          } else if (hasCommentWithSpace) {
            newCursorPosition = selectionStart - 3;
          } else if (hasComment) {
            newCursorPosition = selectionStart - 2;
          }

          //   else if (selectionStart > beforeCursor + 2) {
          //     newCursorPosition = selectionStart - 3;
          //   }

          cursorPosition.current = newCursorPosition;

          props.onChange(
            newValue,
            e as unknown as React.ChangeEvent<HTMLTextAreaElement>
          );
        }
      },
      [props]
    );

    useLayoutEffect(() => {
      const textarea = textareaRef;
      if (textarea.current) {
        textarea.current.setSelectionRange(
          cursorPosition.current,
          cursorPosition.current
        );
      }
    }, [props.value]);

    return (
      <div className={classNames(style.editor, props.className)}>
        <InputLabel
          sx={{
            fontSize: "0.875rem",
          }}
          className={style.label}
        >
          {props.label}
        </InputLabel>
        <Paper variant="outlined" className={style.paperBox}>
          <textarea
            ref={textareaRef}
            value={props.value}
            onChange={(e) => {
              cursorPosition.current = e.target.selectionStart;
              props.onChange(e.target.value, e);
            }}
            onKeyDown={handleKeyDown}
          />
        </Paper>
      </div>
    );
  }
);

Editor.displayName = "Editor";
export default Editor;

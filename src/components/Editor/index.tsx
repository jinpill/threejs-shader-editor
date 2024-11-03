import React, { useRef, useImperativeHandle } from "react";
import classNames from "classnames";
import Paper from "@mui/material/Paper";
import { InputLabel } from "@mui/material";
import style from "./style.module.scss";

export type EditorProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

/**
 * - `--width` textarea의 너비를 지정
 * - `--height` textarea의 높이를 지정
 */
const Editor = React.forwardRef<HTMLTextAreaElement, EditorProps>((props, ref) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useImperativeHandle(ref, () => textareaRef.current!, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;

    if (e.ctrlKey && e.key === "/") {
      e.preventDefault();
      handleComment(textarea);
    } else if (!e.shiftKey && e.key === "Tab") {
      e.preventDefault();
      handleTab(textarea);
    } else if (e.shiftKey && e.key === "Tab") {
      e.preventDefault();
      handleShiftTab(textarea);
    }
  };

  const handleComment = (textarea: HTMLTextAreaElement) => {
    const { selectionStart, selectionEnd, value } = textarea;

    const beforeCursorPos = value.lastIndexOf("\n", selectionStart - 1) + 1;
    const afterCursorPos = value.indexOf("\n", selectionEnd);
    const lastCursorPos = afterCursorPos === -1 ? value.length : afterCursorPos;

    const currentLine = value.slice(beforeCursorPos, lastCursorPos);
    const hasComment = currentLine.trim().startsWith("//");
    const hasCommentWithSpace = currentLine.trim().startsWith("// ");

    const newLine = hasCommentWithSpace
      ? currentLine.replace(/^(\s*)\/\/\s/, "$1")
      : hasComment
      ? currentLine.replace(/^(\s*)\/\//, "$1")
      : currentLine.replace(/^(\s*)/, "$1// ");

    const newValue =
      value.slice(0, beforeCursorPos) + newLine + value.slice(lastCursorPos);

    let newCursorPos = selectionStart;
    if (!hasComment) {
      newCursorPos = selectionStart + 3;
    } else if (hasCommentWithSpace) {
      newCursorPos = selectionStart - 3;
    } else if (hasComment) {
      newCursorPos = selectionStart - 2;
    }

    props.onChange(newValue);

    setTimeout(() => {
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleTab = (textarea: HTMLTextAreaElement) => {
    const { selectionStart, selectionEnd, value } = textarea;

    const beforeCursorPos = value.lastIndexOf("\n", selectionStart - 1) + 1;
    const afterCursorPos = value.indexOf("\n", selectionEnd);
    const lastCursorPos = afterCursorPos === -1 ? value.length : afterCursorPos;

    const selectedText = value.slice(beforeCursorPos, lastCursorPos);
    const lines = selectedText.split("\n");

    let newValue: string;

    if (selectionStart !== selectionEnd && lines.length > 1) {
      const tabLines = lines.map((line) => "  " + line);
      newValue =
        value.slice(0, beforeCursorPos) +
        tabLines.join("\n") +
        value.slice(lastCursorPos);

      props.onChange(newValue);

      setTimeout(() => {
        const newCursorPos = selectionEnd + 2 * lines.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
    } else {
      const lineBeforeCursor = value.slice(beforeCursorPos, selectionStart);
      const leadingSpacesCount = lineBeforeCursor.match(/^\s*/)?.[0].length || 0;

      const spaceToAdd = leadingSpacesCount % 2 === 0 ? " " : "  ";
      newValue = value.slice(0, selectionStart) + spaceToAdd + value.slice(selectionEnd);
      props.onChange(newValue);

      setTimeout(() => {
        const newCursorPos = selectionStart + spaceToAdd.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
    }
  };

  const handleShiftTab = (textarea: HTMLTextAreaElement) => {
    const { selectionStart, selectionEnd, value } = textarea;

    const beforeCursorPos = value.lastIndexOf("\n", selectionStart - 1) + 1;
    const afterCursorPos = value.indexOf("\n", selectionEnd);
    const lastCursorPos = afterCursorPos === -1 ? value.length : afterCursorPos;

    const currentLine = value.slice(beforeCursorPos, lastCursorPos);
    const leadingSpaces = currentLine.match(/^\s*/)?.[0].length || 0;

    const spacesToRemove = leadingSpaces % 2 === 0 ? 2 : 1;

    const newLine = currentLine.replace(new RegExp(`^\\s{0,${spacesToRemove}}`), "");

    const newValue =
      value.slice(0, beforeCursorPos) + newLine + value.slice(lastCursorPos);

    props.onChange(newValue);

    setTimeout(() => {
      textarea.setSelectionRange(
        selectionStart - spacesToRemove,
        selectionStart - spacesToRemove,
      );
    }, 0);
  };

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
          spellCheck="false"
          ref={textareaRef}
          value={props.value}
          onChange={(e) => {
            props.onChange(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
      </Paper>
    </div>
  );
});

Editor.displayName = "Editor";
export default Editor;

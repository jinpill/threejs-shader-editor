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
    const { selectionStart, value } = textarea;
    const cursorPos = getCursorPositions(textarea);

    const currentLine = value.slice(cursorPos.before, cursorPos.last);
    const hasComment = currentLine.trim().startsWith("//");
    const hasCommentWithSpace = currentLine.trim().startsWith("// ");

    const newLine = hasCommentWithSpace
      ? currentLine.replace(/^(\s*)\/\/\s/, "$1")
      : hasComment
      ? currentLine.replace(/^(\s*)\/\//, "$1")
      : currentLine.replace(/^(\s*)/, "$1// ");

    const newValue =
      value.slice(0, cursorPos.before) + newLine + value.slice(cursorPos.last);

    let newCursorPos = selectionStart;
    if (!hasComment) {
      newCursorPos = selectionStart + 3;
    } else if (hasCommentWithSpace) {
      newCursorPos = selectionStart - 3;
    } else if (hasComment) {
      newCursorPos = selectionStart - 2;
    }

    props.onChange(newValue);
    setSelectionRange(textarea, newCursorPos);
  };

  const handleTab = (textarea: HTMLTextAreaElement) => {
    const { selectionStart, selectionEnd, value } = textarea;
    const cursorPos = getCursorPositions(textarea);

    const selectedText = value.slice(cursorPos.before, cursorPos.last);
    const lines = selectedText.split("\n");

    let newValue: string;

    if (selectionStart !== cursorPos.after && lines.length > 1) {
      const tabLines = lines.map((line) => "  " + line);
      newValue =
        value.slice(0, cursorPos.before) +
        tabLines.join("\n") +
        value.slice(cursorPos.last);

      props.onChange(newValue);

      const newSelectionEnd = selectionEnd + 2 * lines.length;
      setSelectionRange(textarea, selectionStart + 2, newSelectionEnd);
    } else {
      const lineBeforeCursor = value.slice(cursorPos.before, selectionStart);
      const CharCount = lineBeforeCursor.length;

      const spaceToAdd = CharCount % 2 === 0 ? "  " : " ";
      newValue = value.slice(0, selectionStart) + spaceToAdd + value.slice(selectionEnd);

      props.onChange(newValue);

      setSelectionRange(textarea, selectionStart + spaceToAdd.length);
    }
  };

  const handleShiftTab = (textarea: HTMLTextAreaElement) => {
    const { selectionStart, selectionEnd, value } = textarea;
    const cursorPos = getCursorPositions(textarea);
    const selectedText = value.slice(cursorPos.before, cursorPos.last);

    if (!selectedText.trim()) {
      return;
    }

    const lines = selectedText.split("\n");

    let newValue: string;
    let totalRemovedSpaces = 0;

    if (selectionStart !== cursorPos.after && lines.length > 1) {
      const updatedLines: string[] = [];
      const spacesRemovedPerLine: number[] = [];

      for (const line of lines) {
        const leadingSpaces = line.match(/^\s*/)?.[0].length || 0;
        const spacesToRemove = Math.min(leadingSpaces, 2);
        spacesRemovedPerLine.push(spacesToRemove);

        const updatedLine = line.replace(new RegExp(`^\\s{0,${spacesToRemove}}`), "");
        updatedLines.push(updatedLine);
      }

      newValue =
        value.slice(0, cursorPos.before) +
        updatedLines.join("\n") +
        value.slice(cursorPos.last);

      totalRemovedSpaces = spacesRemovedPerLine.reduce((sum, spaces) => sum + spaces, 0);

      props.onChange(newValue);

      const startLineRemovedSpaces = spacesRemovedPerLine[0] || 0;
      const newSelectionStart = selectionStart - startLineRemovedSpaces;
      const newSelectionEnd = selectionEnd - totalRemovedSpaces;

      setSelectionRange(textarea, newSelectionStart, newSelectionEnd);
    } else {
      const currentLine = value.slice(cursorPos.before, cursorPos.last);
      const leadingSpaces = currentLine.match(/^\s*/)?.[0].length || 0;
      const spacesToRemove = Math.min(leadingSpaces, 2);
      const updatedLine = currentLine.replace(
        new RegExp(`^\\s{0,${spacesToRemove}}`),
        "",
      );

      newValue =
        value.slice(0, cursorPos.before) + updatedLine + value.slice(cursorPos.last);

      props.onChange(newValue);

      const newCursorPos = selectionStart - spacesToRemove;
      setSelectionRange(textarea, newCursorPos);
    }
  };

  const getCursorPositions = (textarea: HTMLTextAreaElement) => {
    const { selectionStart, selectionEnd, value } = textarea;

    const beforeCursorPos = value.lastIndexOf("\n", selectionStart - 1) + 1;
    const afterCursorPos = value.indexOf("\n", selectionEnd);
    const lastCursorPos = afterCursorPos === -1 ? value.length : afterCursorPos;

    return {
      before: beforeCursorPos,
      after: afterCursorPos,
      last: lastCursorPos,
    };
  };

  const setSelectionRange = (
    textarea: HTMLTextAreaElement,
    start: number,
    end?: number,
  ) => {
    setTimeout(() => {
      textarea.setSelectionRange(start, end ?? start);
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

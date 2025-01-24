import React, { useRef, useMemo, useImperativeHandle, useEffect } from "react";
import classNames from "classnames";
import Paper from "@mui/material/Paper";
import { InputLabel } from "@mui/material";

import { HistoryManager } from "@/utils/HistoryManager";
import style from "./style.module.scss";

type HistoryState = {
  value: string;
  cursorStart: number;
  cursorEnd: number;
};

export type EditorProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
};

/**
 * - `--ed-width` textarea의 너비를 지정 (default: 31.25rem)
 * - `--ed-height` textarea의 높이를 지정 (default: 15rem)
 */
const Editor = React.forwardRef<HTMLTextAreaElement, EditorProps>((props, ref) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useImperativeHandle(ref, () => textareaRef.current!, [textareaRef]);

  const history = useMemo(() => {
    const history = new HistoryManager<HistoryState>(50);
    return history;
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key === "/") {
      e.preventDefault();
      handleComment(e.currentTarget);
      return;
    }

    if (!e.shiftKey && e.key === "Tab") {
      e.preventDefault();
      handleIndent(e.currentTarget);
      return;
    }

    if (e.shiftKey && e.key === "Tab") {
      e.preventDefault();
      handleUnIndent(e.currentTarget);
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      handleEnter(e.currentTarget);
      return;
    }

    if (e.ctrlKey && e.code === "KeyZ") {
      e.preventDefault();
      handleUndo(e.currentTarget);
      return;
    }

    if (e.ctrlKey && e.code === "KeyY") {
      e.preventDefault();
      handleRedo(e.currentTarget);
      return;
    }
  };

  // 주석에 대한 기능
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

    const offset = !hasComment ? 3 : hasCommentWithSpace ? -3 : -2;
    const newCursorPos = selectionStart + offset;

    updateTextarea(textarea, newValue, newCursorPos);
  };

  // 인덴트에 대한 기능
  const handleIndent = (textarea: HTMLTextAreaElement) => {
    const { selectionStart, selectionEnd, value } = textarea;
    const cursorPos = getCursorPositions(textarea);

    const selectedText = value.slice(cursorPos.before, cursorPos.last);
    const lines = selectedText.split("\n");

    if (selectionStart !== cursorPos.after && lines.length > 1) {
      const tabLines = lines.map((line) => "  " + line);
      const newValue =
        value.slice(0, cursorPos.before) +
        tabLines.join("\n") +
        value.slice(cursorPos.last);

      const newSelectionEnd = selectionEnd + 2 * lines.length;
      updateTextarea(textarea, newValue, selectionStart + 2, newSelectionEnd);
    } else {
      const lineBeforeCursor = value.slice(cursorPos.before, selectionStart);
      const CharCount = lineBeforeCursor.length;

      const spaceToAdd = CharCount % 2 === 0 ? "  " : " ";
      const newValue =
        value.slice(0, selectionStart) + spaceToAdd + value.slice(selectionEnd);

      updateTextarea(textarea, newValue, selectionStart + spaceToAdd.length);
    }
  };

  // 언인덴트에 대한 기능
  const handleUnIndent = (textarea: HTMLTextAreaElement) => {
    const { selectionStart, selectionEnd, value } = textarea;
    const cursorPos = getCursorPositions(textarea);
    const selectedText = value.slice(cursorPos.before, cursorPos.last);

    if (!selectedText.trim()) return;

    const lines = selectedText.split("\n");

    if (selectionStart !== cursorPos.after && lines.length > 1) {
      const updatedLines = lines.map((line) => line.replace(/^ {1,2}/, ""));

      const totalRemovedSpaces = lines.reduce(
        (sum, line) => sum + getLeadingSpaces(line),
        0,
      );
      const startLineRemovedSpaces = getLeadingSpaces(lines[0]);

      const newValue =
        value.slice(0, cursorPos.before) +
        updatedLines.join("\n") +
        value.slice(cursorPos.last);

      const newSelectionStart = Math.max(selectionStart - startLineRemovedSpaces, 0);
      const newSelectionEnd = Math.max(selectionEnd - totalRemovedSpaces, 0);

      updateTextarea(textarea, newValue, newSelectionStart, newSelectionEnd);
    } else {
      const currentLine = value.slice(cursorPos.before, cursorPos.last);
      const leadingSpaces = currentLine.match(/^\s*/)?.[0].length || 0;
      const spacesToRemove = Math.min(leadingSpaces, 2);
      const updatedLine = currentLine.replace(/^ {1,2}/, "");

      const newValue =
        value.slice(0, cursorPos.before) + updatedLine + value.slice(cursorPos.last);

      const newCursorPos = selectionStart - spacesToRemove;

      updateTextarea(textarea, newValue, newCursorPos);
    }
  };

  // 들여쓰기에 대한 기능
  const handleEnter = (textarea: HTMLTextAreaElement) => {
    const { selectionStart, value } = textarea;

    const cursorPos = getCursorPositions(textarea);
    const currentLine = value.slice(cursorPos.before, cursorPos.last);

    const leadingSpaces = currentLine.match(/^\s*/)?.[0] || "";
    const newValue =
      value.slice(0, selectionStart) + `\n${leadingSpaces}` + value.slice(selectionStart);

    const newCursorPos = selectionStart + 1 + leadingSpaces.length;

    updateTextarea(textarea, newValue, newCursorPos);
  };

  const getLeadingSpaces = (line: string, maxSpaces = 2) => {
    const leadingSpaces = line.match(/^ */)?.[0].length || 0;
    return Math.min(leadingSpaces, maxSpaces);
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

  const handleUndo = (textarea: HTMLTextAreaElement) => {
    if (!history.isUndoAvailable) return;

    const state = history.undo();
    if (state === null) return;

    updateTextarea(textarea, state.value, state.cursorStart, state.cursorEnd);
  };

  const handleRedo = (textarea: HTMLTextAreaElement) => {
    if (!history.isRedoAvailable) return;

    const state = history.redo();
    if (state === null) return;

    updateTextarea(textarea, state.value, state.cursorStart, state.cursorEnd);
  };

  const updateTextarea = (
    textarea: HTMLTextAreaElement,
    newValue: string,
    cursorStart: number,
    cursorEnd?: number,
  ) => {
    props.onChange(newValue);
    setSelectionRange(textarea, cursorStart, cursorEnd);
  };

  useEffect(() => {
    const $textarea = textareaRef.current;
    if (!$textarea) return;

    const updateCursorPosition = () => {
      const state = history.current;
      if (state === null) return;

      const stateValue = state.value.replaceAll("\r", "");
      const currentValue = $textarea.value.replaceAll("\r", "");
      if (stateValue !== currentValue) return;

      history.update({
        ...state,
        cursorStart: $textarea.selectionStart,
        cursorEnd: $textarea.selectionEnd,
      });
    };

    $textarea.addEventListener("input", updateCursorPosition);
    $textarea.addEventListener("click", updateCursorPosition);
    $textarea.addEventListener("keyup", updateCursorPosition);

    return () => {
      $textarea.removeEventListener("input", updateCursorPosition);
      $textarea.removeEventListener("click", updateCursorPosition);
      $textarea.removeEventListener("keyup", updateCursorPosition);
    };
  }, [history]);

  useEffect(() => {
    const $textarea = textareaRef.current;
    if (!$textarea) return;

    history.push({
      value: props.value,
      cursorStart: $textarea.selectionStart,
      cursorEnd: $textarea.selectionEnd,
    });
  }, [history, props.value]);

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
          placeholder={props.placeholder}
        />
      </Paper>
    </div>
  );
});

Editor.displayName = "Editor";
export default Editor;

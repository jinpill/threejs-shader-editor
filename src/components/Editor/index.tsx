import React, { useRef, useImperativeHandle, useEffect } from "react";
import classNames from "classnames";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { InputLabel } from "@mui/material";
import style from "./style.module.scss";

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    if (e.ctrlKey) {
      switch (e.key) {
        case "s":
          e.preventDefault();
          saveToLocalStorage();
          break;
        case "e":
          e.preventDefault();
          exportFile();
          break;
        case "i":
          e.preventDefault();
          importFile();
          break;
        case "/":
          e.preventDefault();
          handleComment(textarea);
          break;
      }
    } else if (!e.shiftKey && e.key === "Tab") {
      e.preventDefault();
      handleIndent(textarea);
    } else if (e.shiftKey && e.key === "Tab") {
      e.preventDefault();
      handleUnIndent(textarea);
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleEnter(textarea);
    }
  };

  // 로컬스토리지 저장
  useEffect(() => {
    const localStorageKey =
      props.label === "Vertex Shader" ? "vertexShader" : "fragmentShader";
    const savedData = localStorage.getItem(localStorageKey);
    if (savedData !== null) {
      props.onChange(savedData);
    }
  }, []);

  const saveToLocalStorage = () => {
    const localStorageKey =
      props.label === "Vertex Shader" ? "vertexShader" : "fragmentShader";
    localStorage.setItem(localStorageKey, props.value);
    console.log("저장되었습니다.");
  };

  // 파일 내보내기
  const exportFile = () => {
    const fileName =
      props.label === "Vertex Shader" ? "vertex_shader.glsl" : "fragment_shader.glsl";
    const blob = new Blob([props.value], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  };

  // 파일 불러오기
  const importFile = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".glsl";

    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (!file) return;

      if (!file.name.endsWith(".glsl")) {
        alert("GLSL 파일만 선택 가능합니다.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event: any) => {
        const shaderCode = event.target.result;
        props.onChange(shaderCode);
      };
      reader.readAsText(file);
    };
    input.click();
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

  const updateTextarea = (
    textarea: HTMLTextAreaElement,
    newValue: string,
    cursorStart: number,
    cursorEnd?: number,
  ) => {
    props.onChange(newValue);
    setSelectionRange(textarea, cursorStart, cursorEnd);
  };

  return (
    <div className={classNames(style.editor, props.className)}>
      <div className={style.btnCon}>
        <InputLabel className={style.label}>{props.label}</InputLabel>
        <div>
          <Button className={style.flieButton} onClick={saveToLocalStorage}>
            저장
          </Button>
          <Button className={style.flieButton} onClick={exportFile}>
            내보내기
          </Button>
          <Button className={style.flieButton} onClick={importFile}>
            불러오기
          </Button>
        </div>
      </div>
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

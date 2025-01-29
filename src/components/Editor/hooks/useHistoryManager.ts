import { useEffect, useMemo } from "react";
import { HistoryManager } from "@/utils/HistoryManager";

type HistoryState = {
  value: string;
  cursorStart: number;
  cursorEnd: number;
};

type UpdateTextarea = (
  textarea: HTMLTextAreaElement,
  newValue: string,
  cursorStart: number,
  cursorEnd?: number,
) => void;

type UseHistoryManagerParams = {
  value: string;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  updateTextarea: UpdateTextarea;
};

const useHistoryManager = (params: UseHistoryManagerParams) => {
  const history = useMemo(() => {
    const history = new HistoryManager<HistoryState>(50);
    return history;
  }, []);

  const handleUndo = (textarea: HTMLTextAreaElement) => {
    if (!history.isUndoAvailable) return;

    const state = history.undo();
    if (state === null) return;

    params.updateTextarea(textarea, state.value, state.cursorStart, state.cursorEnd);
  };

  const handleRedo = (textarea: HTMLTextAreaElement) => {
    if (!history.isRedoAvailable) return;

    const state = history.redo();
    if (state === null) return;

    params.updateTextarea(textarea, state.value, state.cursorStart, state.cursorEnd);
  };

  useEffect(() => {
    const $textarea = params.textareaRef.current;
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
  }, [params.textareaRef, history]);

  useEffect(() => {
    const $textarea = params.textareaRef.current;
    if (!$textarea) return;

    history.push({
      value: params.value,
      cursorStart: $textarea.selectionStart,
      cursorEnd: $textarea.selectionEnd,
    });
  }, [params.textareaRef, history, params.value]);

  return {
    handleUndo,
    handleRedo,
  };
};

export default useHistoryManager;

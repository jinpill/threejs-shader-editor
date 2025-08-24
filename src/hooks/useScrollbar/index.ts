import { useCallback } from "react";
import style from "@/components/Scrollbar/style.module.scss";

type SetScrollTopCallback = (data: SetScrollTopData) => number | null;

type SetScrollTopData = {
  $scrollbar: HTMLDivElement;
  $contents: HTMLDivElement;
  useSmooth: () => void;
};

const useScrollbar = () => {
  const setScrollTop = useCallback(
    ($scrollbar: HTMLDivElement | null, callback: SetScrollTopCallback) => {
      const $contents = $scrollbar?.querySelector(`.${style.contents}`);
      if (!$scrollbar || !$contents) return;

      const data: SetScrollTopData = {
        $scrollbar: $scrollbar,
        $contents: $contents as HTMLDivElement,
        useSmooth: () => (behavior = "smooth"),
      };
      let behavior: Exclude<ScrollBehavior, "auto"> = "instant";

      const scrollTop = callback(data);
      if (scrollTop === null) return;

      $contents.scrollTo({
        top: scrollTop,
        behavior: behavior,
      });
    },
    [],
  );

  return setScrollTop;
};

export default useScrollbar;

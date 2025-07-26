import { useEffect, useRef, useState } from "react";
import Scrim from "@/components/Scrim";
import { useOptionsStore } from "@/stores/useOptionsStore";
import style from "./style.module.scss";

const Options = () => {
  const scrimRef = useRef<HTMLDivElement>(null);
  const { options, setOptions } = useOptionsStore();
  const [styles, setStyles] = useState<React.CSSProperties | null>(null);

  useEffect(() => {
    const $scrim = scrimRef.current;
    const scrimRect = $scrim?.getBoundingClientRect();
    if (!options || !scrimRect) {
      setStyles(null);
      return;
    }

    const width = options.rect.width;
    const top = options.rect.top - scrimRect.top + options.rect.height;
    const left = options.rect.left - scrimRect.left;

    setStyles({
      width,
      top,
      left,
    });
  }, [options]);

  if (!options) return null;
  return (
    <Scrim ref={scrimRef} opacity={0} onClick={() => setOptions(null)}>
      {styles && (
        <ul className={style.options} style={styles}>
          {options.list.map((option) => (
            <li
              key={option.value}
              className={style.option}
              onClick={() => {
                options.callback(option.value);
                setOptions(null);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </Scrim>
  );
};

export default Options;

import React, { useMemo } from "react";

type TextNormalizerProps = {
  text: string;
};

const TextNormalizer = React.forwardRef<HTMLSpanElement, TextNormalizerProps>(
  (props, ref) => {
    const children = useMemo(() => {
      return props.text.split("\n").reduce((acc, text, i, arr) => {
        text = text.trim();
        if (i === 0 && !text) return acc;
        if (i === arr.length - 1 && !text) return acc;

        const node = (
          <React.Fragment key={i}>
            {acc.length > 0 && <br />}
            {text}
          </React.Fragment>
        );

        acc.push(node);
        return acc;
      }, [] as React.ReactNode[]);
    }, [props.text]);

    return <span ref={ref}>{children}</span>;
  },
);

TextNormalizer.displayName = "TextNormalizer";
export default TextNormalizer;

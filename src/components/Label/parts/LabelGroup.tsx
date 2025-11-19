import { useCallback, useMemo, useState } from "react";
import { LabelGroupContext } from "../hooks";

const LabelGroup = (props: React.PropsWithChildren) => {
  const [object, setObject] = useState<Record<string, number>>({});

  const width = useMemo(() => {
    const keys = Object.keys(object);
    return keys.reduce((max, key) => {
      return Math.max(max, object[key]);
    }, 0);
  }, [object]);

  const updateWidth = useCallback((id: string, width: number) => {
    setObject((prev) => ({
      ...prev,
      [id]: width,
    }));
  }, []);

  const disconnect = useCallback((id: string) => {
    setObject((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  return (
    <LabelGroupContext.Provider
      value={{
        width,
        updateWidth,
        disconnect,
      }}
    >
      {props.children}
    </LabelGroupContext.Provider>
  );
};

export default LabelGroup;

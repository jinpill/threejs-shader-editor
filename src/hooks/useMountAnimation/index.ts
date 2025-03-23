import { useContext } from "react";
import Context from "@/components/MountAnimation/context";

const useMountAnimation = () => {
  const { state, unmount } = useContext(Context);
  const isUnmounting = state === "unmounting";

  const handleAnimationEnd = () => {
    if (!isUnmounting) return;
    unmount();
  };

  return {
    isUnmounting,
    handleAnimationEnd,
  };
};

export default useMountAnimation;

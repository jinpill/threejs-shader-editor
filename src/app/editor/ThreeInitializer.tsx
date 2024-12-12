import { useThreeStore } from "@/stores/useThreeStore";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

const ThreeInitializer = () => {
  const state = useThree();
  const { initThreeStore } = useThreeStore();

  useEffect(() => {
    initThreeStore(state);
  }, [state, initThreeStore]);

  return null;
};

export default ThreeInitializer;

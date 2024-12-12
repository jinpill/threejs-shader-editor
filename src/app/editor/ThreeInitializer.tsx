import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { useThreeStore } from "@/stores/useThreeStore";

const ThreeInitializer = () => {
  const state = useThree();
  const { initThreeStore } = useThreeStore();

  useEffect(() => {
    initThreeStore(state);
  }, [state, initThreeStore]);

  return null;
};

export default ThreeInitializer;

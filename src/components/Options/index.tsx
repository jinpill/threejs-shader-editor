import MountAnimation from "@/components/MountAnimation";
import Contents from "./parts/Contents";
import { useOptionsStore } from "@/stores/useOptionsStore";

const Options = () => {
  const { options } = useOptionsStore();
  const isVisible = !!options;

  return (
    <MountAnimation isVisible={isVisible}>
      <Contents />
    </MountAnimation>
  );
};

export default Options;

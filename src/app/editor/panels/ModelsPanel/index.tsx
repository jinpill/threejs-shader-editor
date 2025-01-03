import ToolPanel from "@/components/ToolPanel";
import ModelCard from "./ModelCard";

const ModelsPanel = () => {
  return (
    <ToolPanel title="모델 변경" name="Models">
      <ModelCard name="Box" onClick={() => console.log("Click Box")} />
      <ModelCard name="Sphere" onClick={() => console.log("Click Sphere")} />
      <ModelCard name="Rabbit" onClick={() => console.log("Click Rabbit")} />
      <ModelCard name="Cat" onClick={() => console.log("Click Cat")} />
    </ToolPanel>
  );
};

export default ModelsPanel;

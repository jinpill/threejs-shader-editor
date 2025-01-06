import ToolPanel from "@/components/ToolPanel";
import ModelCard from "./ModelCard";

const ModelsPanel = () => {
  return (
    <ToolPanel title="모델 변경" name="Models">
      <ModelCard
        name="Box"
        details={`50,322 faces \n 25,000 vertices\n 40.1 × 60.5 × 50.2 mm`}
        onClick={() => console.log("Click Box")}
      />
      <ModelCard
        name="Sphere"
        details={`50,322 faces \n 25,000 vertices\n 40.1 × 60.5 × 50.2 mm`}
        onClick={() => console.log("Click Sphere")}
      />
      <ModelCard
        name="Rabbit"
        details={`50,322 faces \n 25,000 vertices\n 40.1 × 60.5 × 50.2 mm`}
        onClick={() => console.log("Click Rabbit")}
      />
      <ModelCard
        name="Cat"
        details={`50,322 faces \n 25,000 vertices\n 40.1 × 60.5 × 50.2 mm`}
        onClick={() => console.log("Click Cat")}
      />
    </ToolPanel>
  );
};

export default ModelsPanel;

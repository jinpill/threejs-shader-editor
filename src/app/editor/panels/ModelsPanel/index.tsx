import ToolPanel from "@/components/ToolPanel";
import ModelCard from "./ModelCard";
import { useGeometryStore } from "@/stores/useGeometryStore";

const ModelsPanel = () => {
  const { setGeometryParams } = useGeometryStore();
  return (
    <ToolPanel title="모델 변경" name="Models">
      <ModelCard
        name="Box"
        image="/box.jpg"
        details={`12 faces \n 24 vertices\n 10 × 10 × 10 mm`}
        onClick={() =>
          setGeometryParams({
            type: "box",
            width: 10,
            height: 10,
            depth: 10,
            widthSegments: 1,
            heightSegments: 1,
            depthSegments: 1,
          })
        }
      />
      <ModelCard
        name="Sphere"
        image="/sphere.jpg"
        details={`960 faces \n 561 vertices \n 20 × 20 × 20 mm`}
        onClick={() =>
          setGeometryParams({
            type: "sphere",
            radius: 10,
            widthSegments: 32,
            heightSegments: 16,
            phiStart: 0,
            phiLength: Math.PI * 2,
            thetaStart: 0,
            thetaLength: Math.PI,
          })
        }
      />
      <ModelCard
        name="Cylinder"
        image="/cylinder.jpg"
        details={`128 faces\n 196 vertices\n 10 × 14 × 10 mm`}
        onClick={() =>
          setGeometryParams({
            type: "cylinder",
            radiusTop: 5,
            radiusBottom: 5,
            height: 14,
            radialSegments: 32,
            heightSegments: 1,
            openEnded: false,
            thetaStart: 0,
            thetaLength: Math.PI * 2,
          })
        }
      />
    </ToolPanel>
  );
};

export default ModelsPanel;

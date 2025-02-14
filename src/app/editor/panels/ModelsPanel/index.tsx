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
      <ModelCard
        name="Bunny"
        image="/bunny.png"
        details={`309 faces\n 927 vertices\n 85 × 66.9 × 83.9 mm`}
        onClick={() =>
          setGeometryParams({
            type: "file",
            file: { name: "bunny.stl", path: "/models/bunny.stl" },
          })
        }
      />
      <ModelCard
        name="Cat"
        image="/cat.png"
        details={`368 faces\n 1104 vertices\n 43.9 × 90 × 29.6 mm`}
        onClick={() =>
          setGeometryParams({
            type: "file",
            file: { name: "cat.stl", path: "/models/cat.stl" },
          })
        }
      />
      <ModelCard
        name="Dog"
        image="/dog.png"
        details={`790 faces\n 2370 vertices\n 37.6 × 98 × 90.7 mm`}
        onClick={() =>
          setGeometryParams({
            type: "file",
            file: { name: "dog.stl", path: "/models/dog.stl" },
          })
        }
      />
    </ToolPanel>
  );
};

export default ModelsPanel;

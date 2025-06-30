import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  useEffect,
  useRef,
  useState,
} from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Toasts from ".";
import { useToastStore } from "@/stores/useToastStore";

const meta = {
  title: "Reusable/Toasts",
  component: Toasts,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Toasts>;

export default meta;
type Story = StoryObj<typeof meta>;

const StoryContainer = (props: React.PropsWithChildren) => (
  <div
    style={{
      height: "500px",
      position: "relative",
    }}
  >
    {props.children}
  </div>
);

const StoryButton = (
  props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
) => (
  <button
    style={{
      width: "12.5rem",
      height: "2.5rem",
      borderRadius: "0.25rem",
      border: "0.0625rem solid #d3d3d3",
      backgroundColor: "#f4f4f4",
      fontSize: "1rem",
      cursor: "pointer",
    }}
    onClick={props.onClick}
  >
    {props.children}
  </button>
);

export const Default: Story = {
  args: {},
  render: () => {
    const { addToast, updateToast } = useToastStore();

    const [id, setId] = useState<number | null>(null);
    const progressRef = useRef(0);

    const handleAddToast = () => {
      addToast({
        status: "success",
        title: "우와 신기하다",
        message: "참 쉽죠?",
      });
    };

    const handleAddProgressToast = () => {
      if (id !== null) return;

      const newId = addToast({
        status: "info",
        title: "STL 파일 로드",
        message: "STL 파일을 불러오는 중입니다...",
        progress: 0,
        duration: null,
      });
      setId(newId);
    };

    useEffect(() => {
      if (id === null) return;

      let timeoutId: number | null = null;
      const updateProgress = () => {
        progressRef.current += Math.random() / 2;
        if (progressRef.current >= 1) {
          updateToast(id, {
            title: "STL 파일 로드 완료",
            message: "STL 파일을 성공적으로 불러왔습니다!",
            progress: 1,
            status: "success",
            duration: null,
            buttons: [
              {
                label: "3D 모델 보기",
                type: "primary",
                icon: "check",
                onClick: (event) => {
                  console.log("3D 모델 보기");
                  event.removeToast();
                },
              },
              {
                label: "취소",
                type: "secondary",
                icon: "close",
                onClick: (event) => {
                  console.log("취소");
                  event.removeToast();
                },
              },
            ],
          });
          setId(null);
          progressRef.current = 0;
        } else {
          updateToast(id, {
            progress: progressRef.current,
          });
          timeoutId = window.setTimeout(updateProgress, 500);
        }
      };
      updateProgress();

      return () => {
        if (timeoutId === null) return;
        clearTimeout(timeoutId);
        timeoutId = null;
      };
    }, [id, updateToast]);

    return (
      <StoryContainer>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            position: "absolute",
            top: "50%",
            right: "20%",
            transform: "translate(50%, -50%)",
          }}
        >
          <StoryButton onClick={handleAddToast}>토스트 추가</StoryButton>
          <StoryButton onClick={handleAddProgressToast}>
            {id === null ? "STL 파일 불러오기" : "STL 파일을 불러오는 중..."}
          </StoryButton>
        </div>

        <Toasts />
      </StoryContainer>
    );
  },
};

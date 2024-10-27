import style from "./style.module.scss";

type SampleButtonProps = {
  size: "small" | "medium" | "large";
  children?: React.ReactNode;
};

const SampleButton = (props: SampleButtonProps) => {
  return (
    <button className={style.sampleButton}>
      {props.children}
      <div />
    </button>
  );
};

export default SampleButton;

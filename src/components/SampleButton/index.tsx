type SampleButtonProps = {
  size: "small" | "medium" | "large";
  children?: React.ReactNode;
};

const SampleButton = (props: SampleButtonProps) => {
  return <button>{props.children}</button>;
};

export default SampleButton;

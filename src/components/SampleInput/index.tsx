import style from "./style.module.scss";

type SampleInputProps = {
  type: "text" | "password";
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SampleInput = (props: SampleInputProps) => {
  return (
    <div className={style.input}>
      <input type={props.type} value={props.value} onChange={props.onChange} />
    </div>
  );
};

export default SampleInput;

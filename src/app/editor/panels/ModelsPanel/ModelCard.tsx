import style from "./style.module.scss";

type ModelCardProps = {
  name: string;
  onClick: () => void;
};

const ModelCard = (props: ModelCardProps) => {
  return (
    <div className={style.modelCard} onClick={props.onClick}>
      {props.name}
    </div>
  );
};

export default ModelCard;

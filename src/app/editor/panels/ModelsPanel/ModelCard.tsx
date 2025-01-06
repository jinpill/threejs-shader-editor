import style from "./style.module.scss";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

type ModelCardProps = {
  name: string;
  details: string;
  onClick: () => void;
};

const ModelCard = (props: ModelCardProps) => {
  return (
    <CardActionArea>
      <Card className={style.modelCard} onClick={props.onClick}>
        <CardMedia
          className={style.ImgCard}
          component="img"
          image="/bunny.svg"
          alt="Bunny"
        />
        <Box>
          <CardContent className={style.CardCon}>
            <Typography className={style.TitleCard} component="div">
              {props.name}
            </Typography>
            <Typography className={style.DecCard} component="div">
              {props.details}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </CardActionArea>
  );
};

export default ModelCard;

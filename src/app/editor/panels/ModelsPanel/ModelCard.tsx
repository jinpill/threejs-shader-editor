import style from "./style.module.scss";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

type ModelCardProps = {
  name: string;
  image: string;
  details: string;
  onClick: () => void;
};

const ModelCard = ({ name, image, details, onClick }: ModelCardProps) => {
  return (
    <CardActionArea>
      <Card className={style.modelCard} onClick={onClick}>
        <CardMedia className={style.ImgCard} component="img" image={image} alt={name} />
        <Box>
          <CardContent className={style.CardCon}>
            <Typography className={style.TitleCard} component="div">
              {name}
            </Typography>
            <Typography className={style.DecCard} component="div">
              {details}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </CardActionArea>
  );
};

export default ModelCard;

import React from "react";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Chip from "@material-ui/core/Chip";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imageKeywordList: {
      "& > *": {
        margin: theme.spacing(0.5),
      },
    },
  })
);

export default function Preview(props: {
  generatedPoetry: string[];
  imageSrc: string;
  keywords: string[];
}) {
  const classes = useStyles();
  const generatedPoetry = props.generatedPoetry;
  const imageSrc = props.imageSrc;
  const keywords = props.keywords;

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          title="配图"
          component="img"
          image={imageSrc}
          alt="请导入配图"
          style={{
            width: "auto",
            maxHeight: "150px",
            display: "block",
            margin: "auto",
            textAlign: "center",
            fontSize: "24px",
            padding: `${imageSrc === "" ? "10px 0" : 0}`,
          }}
        />
      </CardActionArea>
      <CardContent>
        <div className={classes.imageKeywordList}>
          <span>图片关键词：</span>
          <Chip variant="outlined" label="关键词1" />
          <Chip variant="outlined" label="关键词2" />
          <Chip variant="outlined" label="关键词3" />
          <Chip variant="outlined" label="关键词4" />
        </div>
        <div
          style={{
            fontFamily: "'Segoe UI',华文行楷",
            fontSize: "24px",
            lineHeight: 0.5,
          }}
        >
          {generatedPoetry.map((line, index) => {
            return (
              <p>
                {line.split("").map((c) => {
                  return index < keywords.length &&
                    keywords[index].indexOf(c) !== -1 ? (
                    <span
                      style={{
                        color: "rgb(27, 151, 200)",
                      }}
                    >
                      {c}
                    </span>
                  ) : (
                    <span>{c}</span>
                  );
                })}
              </p>
            );
          })}
        </div>
      </CardContent>

      <CardActions>
        <Button color="primary">分享</Button>
        <Button color="primary">评分</Button>
      </CardActions>
    </Card>
  );
}

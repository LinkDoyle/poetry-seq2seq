import React from "react";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import * as Api from "./Api";
import Header from "./Header";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: `${theme.spacing(2)}px auto`,
      },
    },
  })
);

const DEFAULT_KEYWORDS = ["叶", "马", "春风", "风雨", "酒", "山", "萧瑟", "晴"];
const FAKE_GENERATED_POETRY = [
  "莫听穿林打叶声，",
  "何妨吟啸且徐行。",
  "竹杖芒鞋轻胜马，",
  "谁怕？一蓑烟雨任平生。",
  "料峭春风吹酒醒，",
  "微冷，山头斜照却相迎。",
  "回首向来萧瑟处，",
  "归去，也无风雨也无晴。",
];

function App() {
  const classes = useStyles();

  const [keywords, setKeywords] = React.useState<string[]>(DEFAULT_KEYWORDS);
  const [generatedPoetry, setGeneratedPoetry] = React.useState(
    FAKE_GENERATED_POETRY
  );
  const [imageSrc, setImageSrc] = React.useState("");
  const [buttonGenerateDisabled, setButtonGenerateDisabled] = React.useState(
    false
  );
  const [state, setState] = React.useState({
    checkedCangtou: false,
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.checked });
  };

  const generate = async () => {
    const info = {
      keywords: keywords,
      isCangTou: true,
      imgBase64: null,
    };

    setButtonGenerateDisabled(true);
    const poetry = await Api.generate(info);
    setButtonGenerateDisabled(false);
    setGeneratedPoetry(poetry);
  };

  const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keywords = e.target.value.split("\n");
    setKeywords(keywords);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (e.target.files !== null) {
      const file = e.target.files[0];
      const reader = new FileReader();
      console.log(file);
      reader.readAsDataURL(file);
      reader.onload = (ev: ProgressEvent<FileReader>) => {
        setImageSrc(reader.result as string);
      };
    }
  };

  return (
    <Container fixed className={classes.root}>
      <Header />
      <Grid container spacing={2}>
        <Grid item>
          <TextField
            id="outlined-multiline-static"
            label="关键词"
            multiline
            rows={8}
            rowsMax={16}
            defaultValue={DEFAULT_KEYWORDS.join("\n")}
            placeholder="请添加关键词"
            variant="outlined"
            onChange={handleKeywordsChange}
            style={{
              minHeight: "100%",
            }}
          />
        </Grid>
        <Grid item>
          <FormControl component="fieldset">
            <FormGroup aria-label="position">
              <FormControlLabel
                control={
                  <Switch
                    color="primary"
                    checked={state.checkedCangtou}
                    name="checkedCangtou"
                    onChange={handleCheckboxChange}
                    edge="end"
                  />
                }
                label="藏头诗"
                labelPlacement="end"
              />
              <ButtonGroup>
                <Button variant="contained" component="label">
                  导入图片
                  <input
                    type="file"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={generate}
                  disabled={buttonGenerateDisabled}
                >
                  生成
                </Button>
              </ButtonGroup>
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>
      <Card>
        <CardActionArea>
          <CardMedia
            title="配图"
            component="img"
            image={imageSrc}
            alt="请导入配图"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              margin: "auto",
              textAlign: "center",
              fontSize: "24px",
              padding: `${imageSrc === "" ? "10px 0" : 0}`,
            }}
          />
        </CardActionArea>
        <CardContent>
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
    </Container>
  );
}

export default App;

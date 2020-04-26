import React from "react";
import Grid from "@material-ui/core/Grid";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import * as Api from "./Api";
import Header from "./Header";

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
  const [keywords, setKeywords] = React.useState<string[]>(DEFAULT_KEYWORDS);
  const [generatedPoetry, setGeneratedPoetry] = React.useState(
    FAKE_GENERATED_POETRY
  );
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

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      spacing={5}
      style={{ minHeight: "100vh" }}
    >
      <Header />
      <Grid
        container
        style={{ width: "100vw" }}
        direction="row"
        alignItems="center"
        justify="center"
        spacing={2}
      >
        <Grid
          item
          style={{ width: "200px" }}
          spacing={2}
          alignItems="center"
          justify="center"
        >
          <FormControl component="fieldset">
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
              <Button
                variant="contained"
                color="primary"
                onClick={generate}
                disabled={buttonGenerateDisabled}
              >
                生成
              </Button>
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid
          item
          xs={8}
          style={{
            width: "100%",
            fontFamily: "'Segoe UI',华文行楷",
            fontSize: "24px",
            lineHeight: 0.5,
          }}
          spacing={0}
          alignItems="center"
          justify="center"
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
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;

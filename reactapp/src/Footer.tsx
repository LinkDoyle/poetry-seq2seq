import React from "react";
import Paper from "@material-ui/core/Paper";
import FavoriteIcon from "@material-ui/icons/Favorite";

export default function Header() {
  return (
    <Paper
      component="footer"
      style={{
        textAlign: "center",
        verticalAlign: "baseline",
        padding: "10px",
      }}
    >
      <p style={{textAlign: "center"}}>
        <FavoriteIcon fontSize="small" style={{ color: "red" }} />
        <FavoriteIcon fontSize="small" style={{ color: "green" }} />
        <FavoriteIcon fontSize="small" style={{ color: "blue" }} />
        <span>&nbsp; </span>
        <span>By 人工智能课程 第二小组 @ SCNU</span>
        <span>&nbsp; </span>
        <FavoriteIcon fontSize="small" style={{ color: "blue" }} />
        <FavoriteIcon fontSize="small" style={{ color: "green" }} />
        <FavoriteIcon fontSize="small" style={{ color: "red" }} />
      </p>
    </Paper>
  );
}

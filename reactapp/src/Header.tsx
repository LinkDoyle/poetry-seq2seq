import React from "react";

export default function Header() {
  return (
    <div
      style={{
        textAlign: "center",
        verticalAlign: "baseline",
        // width: "100vh",
      }}
    >
      <span
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "42px",
          fontWeight: "bold",
          marginRight: 10,
        }}
      >
        AI
      </span>
      <span
        style={{
          fontFamily: "华文行楷",
          fontSize: "48px",
        }}
      >
        作诗
      </span>
    </div>
  );
}

import * as React from "react";
const LeftIcon = (props) => (
  <svg
    fill="#000000"
    width="20px"
    height="20px"
    viewBox="0 0 24 24"
    id="left"
    data-name="Multi Color"
    xmlns="http://www.w3.org/2000/svg"
    className="icon multi-color"
    {...props}
  >
    <title
      style={{
        strokeWidth: 2,
      }}
    >
      {"left"}
    </title>
    <path
      id="primary-stroke"
      d="M10,19,3,12l7-7M3,12H21"
      style={{
        fill: "none",
        stroke: "rgb(0, 0, 0)",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
    />
  </svg>
);
export default LeftIcon;

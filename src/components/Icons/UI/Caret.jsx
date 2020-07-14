import React from "react";
import Icon from "../Icon";

const getTransform = (direction) => {
  switch (direction) {
    case "left":
      return `rotate(90deg)`;
    case "right":
      return `rotate(-90deg)`;
    case "up":
      return `rotate(180deg)`;
    default:
      return null;
  }
};

export default ({ direction, ...props }) => (
  <Icon
    viewBox="0 0 32 32"
    {...props}
    style={{ transform: getTransform(direction) }}
  >
    <path d="M28 10L16 22 4 10" fill="none" />
  </Icon>
);

import "./Tag.scss";
import cx from "classnames";
import React from "react";

const Tag = ({ size, color, className, ...props }) => (
  <p
    className={cx(
      "tag",
      `text-${size}`,
      `text-${color}`,
      `px-2`,
      "glass",
      `glass--${color}`,
      className
    )}
    {...props}
  />
);
Tag.defaultProps = {
  color: "text",
};

export default Tag;

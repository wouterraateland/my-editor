import "./Icon.scss";
import cx from "classnames";

import React from "react";

const Icon = ({ size, strokeWidth, color, style, className, ...props }) => (
  <svg
    style={{ ...style, strokeWidth }}
    className={cx("icon", `text-${color}`, `h-${size * 4}`, className)}
    {...props}
  />
);
Icon.defaultProps = {
  size: 1,
  strokeWidth: 3,
};

export default Icon;

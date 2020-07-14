import "./Card.scss";
import cx from "classnames";

import React from "react";

const Card = ({ elevation, className, ...props }) => (
  <div
    className={cx(
      "card",
      `elevation-${elevation}`,
      { "pointer-auto": props.onClick },
      className
    )}
    {...props}
  />
);

export default Card;

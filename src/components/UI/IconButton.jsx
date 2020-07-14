import "./IconButton.scss";
import cx from "classnames";

import React, { forwardRef } from "react";
import useAsyncCallback from "hooks/useAsyncCallback";

const IconButton = forwardRef(
  (
    { children, onClick, size, variant, color, style, className, disabled },
    ref
  ) => {
    const [isPending, asyncOnClick] = useAsyncCallback(onClick, [onClick]);
    const prefix = variant === "text" ? "icon-link" : "icon-btn";
    return (
      <button
        className={cx(
          `${prefix}`,
          `${prefix}--${size}`,
          `${prefix}--${color}`,
          className
        )}
        style={style}
        ref={ref}
        onClick={asyncOnClick}
        disabled={isPending || disabled}
      >
        {children}
      </button>
    );
  }
);
IconButton.defaultProps = {
  variant: "contained",
  color: "text",
  size: "medium",
};

export default IconButton;

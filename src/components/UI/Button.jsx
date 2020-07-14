import "./Button.scss";
import cx from "classnames";

import React, { forwardRef } from "react";
import useAsyncCallback from "hooks/useAsyncCallback";

const Button = forwardRef(
  (
    {
      lead,
      trail,
      children,
      onClick,
      size,
      variant,
      color,
      importance,
      spacing,
      className,
      style,
      disabled,
    },
    ref
  ) => {
    const [isPending, asyncOnClick] = useAsyncCallback(onClick, [onClick]);
    const prefix = variant === "text" ? "link" : "btn";
    return (
      <button
        ref={ref}
        className={cx(
          `${prefix}`,
          `${prefix}--${size}`,
          `${prefix}--${color}`,
          `space-x-${spacing}`,
          {
            [`${prefix}-important`]: importance === "primary",
          },
          className
        )}
        style={style}
        onClick={asyncOnClick}
        disabled={isPending || disabled}
      >
        {lead}
        <span>{children}</span>
        {trail}
      </button>
    );
  }
);
Button.defaultProps = {
  variant: "contained",
  color: "text",
  importance: "primary",
  spacing: "medium",
  size: "medium",
};

export default Button;

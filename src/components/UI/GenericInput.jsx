import "./Input.scss";
import cx from "classnames";

import React, { forwardRef } from "react";

const GenericInput = forwardRef(
  (
    {
      component: Component,
      prefix,
      suffix,
      lead,
      trail,
      label,
      size,
      variant,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cx(
          "input__container",
          { "input__container--disabled": props.disabled },
          `input__container--${size}`,
          `input__container--${variant}`,
          className
        )}
      >
        {label && (
          <div className="flex items-center space-x-small">
            {lead}
            <p className="input__label text-xs">
              {label}{" "}
              {!props.disabled && props.required && (
                <sup className="input__asterix">*</sup>
              )}
            </p>
            {trail}
          </div>
        )}
        <div
          className={cx("input__inner space-x-medium items-center", {
            "input__inner--filled": props.value,
          })}
        >
          {!label && lead} {prefix} <Component ref={ref} {...props} /> {suffix}{" "}
          {!label && trail}
        </div>
      </div>
    );
  }
);
GenericInput.defaultProps = {
  variant: "bare",
  size: "medium",
};

export default GenericInput;

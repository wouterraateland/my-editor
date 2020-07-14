import "./DropDown.scss";
import cx from "classnames";

import React, { useRef } from "react";

import * as Icons from "components/Icons";
import FlyOut from "./FlyOut";

const DropDown = ({
  value,
  placeholder,
  options,
  required,
  onChange,
  className,
  variant,
  size,
  color,
  emphasis,
}) => {
  const containerRef = useRef(null);
  return (
    <>
      <div
        ref={containerRef}
        tabIndex={0}
        className={cx(
          "box box--horizontal items-center space-x-medium justify-space-between",
          "dropdown",
          { "dropdown--bordered": variant === "bordered" },
          { [`dropdown--${size}`]: variant === "bordered" },
          className
        )}
      >
        <p
          className={cx(
            { "font-bold": emphasis && value },
            `text-${value ? color : "caption"}`
          )}
        >
          {options.some((option) => option.value === value)
            ? options.find((option) => option.value === value).label
            : value || placeholder}
        </p>
        <Icons.Caret
          size={0.75}
          strokeWidth={emphasis && value ? 6 : 3}
          direction="down"
        />
      </div>
      <FlyOut originRef={containerRef} direction="vertical">
        {!required && (
          <FlyOut.Item color="caption" onClick={() => onChange(undefined)}>
            {placeholder}
          </FlyOut.Item>
        )}
        {options.map((option) => (
          <FlyOut.Item
            key={option.value}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </FlyOut.Item>
        ))}
      </FlyOut>
    </>
  );
};
DropDown.defaultProps = {
  variant: "bordered",
  color: "text",
};

export default DropDown;

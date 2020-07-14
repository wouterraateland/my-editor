import cx from "classnames";

import React, { forwardRef } from "react";

const Field = forwardRef(
  (
    {
      component: Component = "input",
      detail,
      labelLocation,
      className,
      ...inputProps
    },
    ref
  ) => {
    return (
      <label className={cx("block flex-grow text-left", className)}>
        {labelLocation === "inline" ? (
          <div className="flex space-x-medium items-flex-start">
            <Component ref={ref} {...inputProps} />
            <div>
              {inputProps.label && <p>{inputProps.label}</p>}
              {detail && <p className="text-xs text-caption">{detail}</p>}
              {inputProps.error && (
                <p className="text-xs text-error">{inputProps.error}</p>
              )}
            </div>
          </div>
        ) : (
          <>
            <Component ref={ref} {...inputProps} />
            {inputProps.error && (
              <p className="text-xs text-error">{inputProps.error}</p>
            )}
          </>
        )}
      </label>
    );
  }
);

export default Field;

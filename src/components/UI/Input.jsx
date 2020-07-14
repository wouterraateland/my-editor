import React, { forwardRef } from "react";

import GenericInput from "./GenericInput";

const ActualInput = forwardRef((props, ref) => (
  <input ref={ref} className="input" {...props} />
));

const Input = forwardRef((props, ref) => (
  <GenericInput ref={ref} component={ActualInput} {...props} />
));

export default Input;

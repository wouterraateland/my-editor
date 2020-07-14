import React, { forwardRef, useLayoutEffect, useRef } from "react";

import GenericInput from "./GenericInput";

const refreshEl = (el) => el.offsetHeight;

const TextAreaImpl = forwardRef((props, ref) => (
  <textarea ref={ref} className="textarea" {...props} />
));

const TextArea = forwardRef((props, ref) => {
  const textAreaRef = useRef(null);
  useLayoutEffect(() => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = "0px";
      refreshEl(textArea);
      textArea.style.height = `${Math.max(
        (props.rows || 1) * 24,
        textArea.scrollHeight
      )}px`;
    }
  }, [ref, props.rows, props.value]);

  return (
    <GenericInput
      ref={(c) => {
        textAreaRef.current = c;
        if (ref) {
          ref.current = c;
        }
      }}
      component={TextAreaImpl}
      {...props}
    />
  );
});

export default TextArea;

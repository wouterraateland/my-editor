import { useLayoutEffect, useMemo } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children }) => {
  const container = useMemo(() => document.createElement("div"), []);

  useLayoutEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  return createPortal(children, container);
};

export default Portal;

import { useLayoutEffect, useMemo } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, isOpen, onClose, usePortal = true }) => {
  const container = useMemo(() => {
    const container = document.createElement("div");
    container.className = "modal";
    return container;
  }, []);

  useLayoutEffect(() => {
    if (typeof onClose === "function") {
      const tryClose = (event) => {
        if (event.target === event.currentTarget) {
          onClose(event);
        }
      };
      container.addEventListener("click", tryClose);
      return () => {
        container.removeEventListener("click", tryClose);
      };
    }
  }, [container, onClose]);

  useLayoutEffect(() => {
    if (isOpen) {
      document.body.appendChild(container);
    }
    container.classList.toggle("isOpen", isOpen);
  }, [container, isOpen]);

  useLayoutEffect(() => {
    return () => {
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
    };
  }, [container]);

  return usePortal ? createPortal(children, container) : children;
};

export default Modal;

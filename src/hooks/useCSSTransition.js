import { useLayoutEffect, useRef } from "react";

const useCSSTransition = (flag, { ref, timeout, appear }) => {
  const innerRef = useRef(null);
  const stateRef = useRef(appear ? "appear" : "enter");

  const actualRef = ref || innerRef;

  useLayoutEffect(() => {
    if (actualRef.current) {
      actualRef.current.style.transitionDuration = `${timeout}ms`;
      let t = null;
      if (flag) {
        if (stateRef.current.startsWith("enter")) {
          if (!actualRef.current.className.includes("enter")) {
            actualRef.current.classList.add("enter-done");
          }
        } else {
          stateRef.current = "enter";
          actualRef.current.classList.remove(
            "exit",
            "exit-active",
            "exit-done"
          );
          actualRef.current.classList.add("enter");
          setTimeout(() => {
            if (actualRef.current) {
              actualRef.current.classList.remove("enter");
              actualRef.current.classList.add("enter-active");
              t = setTimeout(() => {
                if (actualRef.current) {
                  actualRef.current.classList.remove("enter-active");
                  actualRef.current.classList.add("enter-done");
                }
              }, timeout);
            }
          }, 10);
        }
      } else {
        if (stateRef.current.startsWith("exit")) {
          if (!actualRef.current.className.includes("exit")) {
            actualRef.current.classList.add("exit-done");
          }
        } else {
          stateRef.current = "exit";
          actualRef.current.classList.remove(
            "enter",
            "enter-active",
            "enter-done"
          );
          actualRef.current.classList.add("exit");
          setTimeout(() => {
            if (actualRef.current) {
              actualRef.current.classList.remove("exit");
              actualRef.current.classList.add("exit-active");
              t = setTimeout(() => {
                if (actualRef.current) {
                  actualRef.current.classList.remove("exit-active");
                  actualRef.current.classList.add("exit-done");
                }
              }, timeout);
            }
          }, 10);
        }
      }
      return () => clearTimeout(t);
    }
  }, [flag, actualRef, timeout]);

  return actualRef;
};

export default useCSSTransition;

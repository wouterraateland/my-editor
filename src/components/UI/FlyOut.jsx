import "./FlyOut.scss";

import * as _ from "utils";
import cx from "classnames";

import React, { useCallback, useLayoutEffect, useRef } from "react";
import useClickOutside from "hooks/useClickOutside";
import useCSSTransition from "hooks/useCSSTransition";
import useUpstreamState from "hooks/useUpstreamState";

import Modal from "containers/Modal";

const MARGIN = 8;

const FlyOutItem = ({ disabled, color, className, ...props }) => (
  <div
    className={cx(
      "flyout__item",
      `text-${color}`,
      { disabled: disabled },
      className
    )}
    {...props}
  />
);

const toRect = (el) => {
  const rect = el ? el.getClientRects()[0] : null;

  return rect
    ? {
        top: rect.top,
        left: rect.left,
        bottom: rect.bottom,
        right: rect.right,
        centerX: rect.x + rect.width / 2,
        centerY: rect.y + rect.height / 2,
      }
    : {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        centerX: 0,
        centerY: 0,
      };
};

const FlyOut = ({
  direction = "vertical",
  persistOnClick,
  originRef,
  isOpen,
  onClose,
  children,
  className,
  usePortal,
  ...props
}) => {
  const [isVisible, setVisibility] = useUpstreamState(isOpen || false);
  const containerRef = useCSSTransition(isVisible, {
    timeout: 200,
    appear: true,
  });
  const triangleRef = useRef(null);
  const itemsRef = useRef(null);

  const render = useCallback(() => {
    const parent = originRef?.current;
    const originRect = toRect(parent);
    const container = containerRef.current;
    const items = itemsRef.current;
    const triangle = triangleRef.current;

    if (
      parent &&
      originRect &&
      container &&
      items &&
      triangle &&
      typeof window !== "undefined"
    ) {
      const wWidth = window.innerWidth;
      const wHeight = window.innerHeight;
      const width = container.offsetWidth;
      const height = container.offsetHeight;

      const _direction =
        direction === "vertical"
          ? originRect.centerY < wHeight / 2
            ? "bottom"
            : "top"
          : direction === "horizontal"
          ? originRect.centerX < wWidth / 2
            ? "right"
            : "left"
          : direction;

      const cTop =
        _direction === "bottom"
          ? originRect.bottom + MARGIN
          : _direction === "top"
          ? Math.max(MARGIN, originRect.top - (height + MARGIN))
          : _.between(
              MARGIN,
              wHeight - (height + MARGIN)
            )(originRect.centerY - height / 2);
      const cLeft =
        _direction === "left"
          ? Math.max(MARGIN, originRect.left - (width + MARGIN))
          : _direction === "right"
          ? originRect.right + MARGIN
          : _.between(
              MARGIN,
              wWidth - (width + MARGIN)
            )(originRect.centerX - width / 2);

      container.style.top = `${cTop}px`;
      container.style.left = `${cLeft}px`;

      triangle.style.top = `${
        (_direction === "top"
          ? originRect.top
          : _direction === "bottom"
          ? originRect.bottom
          : originRect.centerY) - cTop
      }px`;
      triangle.style.left = `${
        (_direction === "left"
          ? originRect.left
          : _direction === "right"
          ? originRect.right
          : originRect.centerX) - cLeft
      }px`;

      triangle.classList.remove(
        ...["top", "bottom", "left", "right"].filter((x) => x !== _direction)
      );
      triangle.classList.add(_direction);

      container.style.transformOrigin = `${triangle.style.left} ${triangle.style.top}`;

      items.style.maxHeight = `${
        (_direction === "top"
          ? originRect.top
          : _direction === "bottom"
          ? wHeight - originRect.bottom
          : wHeight) -
        MARGIN * 2
      }px`;
    }
  }, [originRef, containerRef, direction]);

  useLayoutEffect(() => {
    const show = () => setVisibility(true);

    const origin = originRef?.current;

    if (origin && typeof window !== "undefined") {
      !onClose && origin.addEventListener("click", show);
      window.addEventListener("mousewheel", render);
      window.addEventListener("resize", render);

      return () => {
        !onClose && origin.removeEventListener("click", show);
        window.removeEventListener("mousewheel", render);
        window.removeEventListener("resize", render);
      };
    }
  }, [render, onClose, originRef, setVisibility]);

  useLayoutEffect(() => {
    if (isVisible) {
      render();
    }
  }, [isVisible, children, render]);

  const close = (event) => {
    event && event.stopPropagation();
    onClose ? onClose() : setVisibility(false);
  };

  useClickOutside(
    containerRef,
    isOpen ? onClose || (() => setVisibility(false)) : () => {}
  );

  return (
    <Modal isOpen={isVisible} onClose={close} usePortal={usePortal}>
      <div
        ref={containerRef}
        {...props}
        className={cx(
          "flyout__container scale-up bg-card border border-solid border-accent rounded",
          className
        )}
      >
        <div className="flyout__triangle" ref={triangleRef} />
        <div
          className="py-2 overflow-y-auto"
          ref={itemsRef}
          onClick={persistOnClick ? (event) => event.stopPropagation() : close}
        >
          {children}
        </div>
      </div>
    </Modal>
  );
};
FlyOut.Item = FlyOutItem;

export default FlyOut;

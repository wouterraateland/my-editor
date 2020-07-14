import "./Loader.scss";
import React, { forwardRef, Suspense } from "react";

const Loader = forwardRef((props, ref) => (
  <div ref={ref} className="loader" {...props} />
));

Loader.WithSuspense = (props) => (
  <Suspense fallback={<div className="loader" />} {...props} />
);

export default Loader;

import React from "react";

import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

const ErrorFallback = ({ error, componentStack, resetErrorBoundary }) => (
  <div className="p-4 h-full items-center justify-center space-y-large">
    <h2>Something went wrong</h2>
    <p className="max-w-sm">
      We have been notified and are on our way to fix this
    </p>
    <button onClick={() => resetErrorBoundary()}>Try again</button>
  </div>
);

const ErrorBoundary = (props) => (
  <ReactErrorBoundary
    FallbackComponent={ErrorFallback}
    onReset={() => {
      window.location.reload();
    }}
    {...props}
  />
);

export default ErrorBoundary;

import React, { Suspense } from "react";

import ColorModeProvider from "./ColorModeProvider";
import ErrorBoundary from "./ErrorBoundary";
import NotificationsProvider from "./NotificationsProvider";
import Routes from "./Routes";

import Notifications from "components/Notifications";

export default () => (
  <NotificationsProvider>
    <ColorModeProvider>
      <ErrorBoundary>
        <Suspense fallback={<div className="loader" />}>
          <Notifications />
          <Routes />
        </Suspense>
      </ErrorBoundary>
    </ColorModeProvider>
  </NotificationsProvider>
);

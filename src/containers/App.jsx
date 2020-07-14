import React, { Suspense } from "react";

import ColorModeProvider from "./ColorModeProvider";
import ErrorBoundary from "./ErrorBoundary";
import NotificationsProvider from "./NotificationsProvider";
import Routes from "./Routes";
import ServiceWorkerManager from "./ServiceWorkerManager";

import Notifications from "components/Notifications";

export default () => (
  <Suspense fallback={<div className="loader" />}>
    <NotificationsProvider>
      <ColorModeProvider>
        <ErrorBoundary>
          <Suspense fallback={<div className="loader" />}>
            <ServiceWorkerManager />
            <Notifications />
            <Routes />
          </Suspense>
        </ErrorBoundary>
      </ColorModeProvider>
    </NotificationsProvider>
  </Suspense>
);

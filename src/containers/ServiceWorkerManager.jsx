import * as serviceWorker from "../serviceWorker";

import { useContext, useLayoutEffect } from "react";
import { NotificationsContext } from "contexts";

const ServiceWorkerManager = () => {
  const [, { notify }] = useContext(NotificationsContext);

  useLayoutEffect(() => {
    const updateServiceWorker = (registration) => {
      const registrationWaiting = registration?.waiting;
      if (registrationWaiting) {
        registrationWaiting.postMessage({ type: "SKIP_WAITING" });
        registrationWaiting.addEventListener("statechange", (e) => {
          if (e.target.state === "activated") {
            window.location.reload();
          }
        });
      }
    };

    serviceWorker.register({
      onSuccess: () =>
        notify({
          type: "success",
          message: "My-editor is now ready for offline usage",
          timeout: 3000,
        }),
      onUpdate: (registration) =>
        notify({
          message: "A new version of My-Editor is available",
          action: {
            label: "Reload",
            onAct: () => updateServiceWorker(registration),
          },
        }),
    });
  }, [notify]);

  return null;
};

export default ServiceWorkerManager;

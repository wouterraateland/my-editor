import "./Notifications.scss";
import React, { useContext } from "react";
import { NotificationsContext } from "contexts";

import Notification from "components/Notification";

const Notifications = () => {
  const [notifications, { closeNotification }] = useContext(
    NotificationsContext
  );

  return (
    <div className="notifications__container">
      <div className="px-4 space-y-4">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            notification={notification}
            onClose={() => closeNotification(notification.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Notifications;

import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";

export default () => {
  const [notifications, setNotifications] = useState([]);

  const notify = (notification) =>
    setNotifications((notifications) => [
      ...notifications,
      { ...notification, id: uuidv4(), createdAt: Date.now() },
    ]);

  const closeNotification = (id) =>
    setNotifications((notifications) =>
      notifications.filter((notification) => notification.id !== id)
    );

  useEffect(() => {
    const timeouts = notifications
      .filter((notification) => notification.timeout)
      .map((notification) =>
        setTimeout(
          () => closeNotification(notification.id),
          notification.createdAt + notification.timeout - Date.now()
        )
      );

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [notifications]);

  return [notifications, { notify, closeNotification }];
};

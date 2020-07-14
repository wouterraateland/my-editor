import React from "react";
import { NotificationsContext } from "contexts";
import useNotifications from "hooks/useNotifications";

const NotificationsProvider = ({ children }) => {
  const value = useNotifications();

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsProvider;

import React from "react";

import * as Icons from "components/Icons";
import { Card } from "components/UI";

const Notification = ({ notification, onClose }) => (
  <Card color={notification.type} elevation="md">
    <div className="notifications__notification flex items-center space-x-2 p-4">
      <p>
        {typeof notification.message === "string"
          ? notification.message
          : "Something went wrong"}
      </p>
      {notification.action && (
        <button onClick={notification.action.onAct}>
          {notification.action.label}
        </button>
      )}
      <button onClick={onClose}>
        <Icons.Cross />
      </button>
    </div>
  </Card>
);

export default Notification;
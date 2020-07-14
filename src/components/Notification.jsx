import React from "react";

import * as Icons from "components/Icons";

const Notification = ({ notification, onClose }) => (
  <div className={`card bg-${notification.type || "card"} rounded shadow-md`}>
    <div className="notifications__notification flex items-center space-x-2 p-4">
      <p>
        {typeof notification.message === "string"
          ? notification.message
          : "Something went wrong"}
      </p>
      {notification.action && (
        <button
          className="flex items-center rounded border-0 bg-glow font-bold"
          onClick={notification.action.onAct}
        >
          {notification.action.label}
        </button>
      )}
      <button
        className="flex items-center rounded border-0 bg-glow"
        onClick={onClose}
      >
        <Icons.Cross strokeWidth={5} />
      </button>
    </div>
  </div>
);

export default Notification;

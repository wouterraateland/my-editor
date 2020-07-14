import React from "react";
import { useLocation } from "react-router-dom";
import useNodeContent from "hooks/useNodeContent";

import { NodeContentContext } from "contexts";

export default (Component) => (props) => {
  const location = useLocation();
  const value = useNodeContent(location.pathname.replace("/n/", ""));

  return (
    <NodeContentContext.Provider value={value}>
      <Component {...props} />
    </NodeContentContext.Provider>
  );
};

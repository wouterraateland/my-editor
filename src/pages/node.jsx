import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import withNodeContent from "hocs/withNodeContent";

import * as Icons from "components/Icons";
import NodePath from "components/node/Path";
import NodeSearch from "components/node/Search";
import NodeEditor from "components/node/Editor";
import ColorModeSwitch from "components/ColorModeSwitch";

export default withNodeContent(() => {
  const navigate = useNavigate();

  useEffect(() => {
    navigator.storage.persist();
  }, []);

  return (
    <div className="flex flex-col items-normal h-full">
      <nav className="flex justify-space-between p-2 space-x-4 border-solid border-0 border-b border-accent bg-background">
        <div className="flex space-x-4">
          <button
            to="/"
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 rounded border-0 font-bold bg-glow"
          >
            <Icons.Arrow size={0.75} strokeWidth={5} direction="left" />
            <span>Home</span>
          </button>
          <NodePath />
        </div>
        <div className="flex space-x-4">
          <NodeSearch />
          <ColorModeSwitch />
        </div>
      </nav>
      <NodeEditor />
    </div>
  );
});

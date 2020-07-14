import React from "react";
import { useNavigate } from "react-router-dom";

import withNodeContent from "hocs/withNodeContent";

import * as Icons from "components/Icons";
import NodePath from "components/node/Path";
import NodeSearch from "components/node/Search";
import NodeEditor from "components/node/Editor";
import ColorModeSwitch from "components/ColorModeSwitch";

export default withNodeContent(() => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-normal h-full">
      <nav className="flex justify-space-between p-2 space-x-4 border-solid border-0 border-b border-accent bg-glow">
        <div className="flex items-center space-x-4">
          <button
            to="/"
            onClick={() => navigate("/")}
            className="flex items-center space-x-2"
          >
            <Icons.Arrow size={0.75} direction="left" />
            <span>Home</span>
          </button>
          <NodePath />
        </div>
        <div className="flex items-center space-x-4">
          <NodeSearch />
          <ColorModeSwitch />
        </div>
      </nav>
      <NodeEditor />
    </div>
  );
});

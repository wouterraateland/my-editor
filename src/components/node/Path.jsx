import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useUpstreamState from "hooks/useUpstreamState";
import useNodeList from "hooks/useNodeList";

import { NodeContentContext } from "contexts";

export default () => {
  const navigate = useNavigate();
  const nodeList = useNodeList();
  const { node } = useContext(NodeContentContext);
  const [path, setPath] = useUpstreamState(node.path);

  return (
    <input
      className="w-full"
      placeholder="path/to/node"
      value={path}
      onChange={(event) => setPath(event.target.value)}
      onBlur={() => {
        nodeList.updateNode(node.id, { path });
        navigate(`/n/${path}`);
      }}
    />
  );
};

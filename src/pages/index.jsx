import * as _ from "utils";
import { formatDistance } from "date-fns";

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useNodeList from "hooks/useNodeList";

import * as Icons from "components/Icons";

export default () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const nodeList = useNodeList();
  const now = new Date();
  const visibleNodes = nodeList.items
    .filter((node) => node.path.toLowerCase().includes(query.toLowerCase()))
    .sort(_.firstBy((node) => node.updatedAt, -1));

  const onSubmitNodeForm = (event) => {
    event.preventDefault();
    const newNode = nodeList.addNode({ path: query });
    navigate(`/n/${newNode.path}`);
  };

  useEffect(() => {
    if (nodeList.items.length === 0) {
      const newNode = nodeList.addNode();
      navigate(`/n/${newNode.path}`);
    }
  }, [navigate, nodeList]);

  return (
    <div className="max-w-md p-8 mx-auto space-y-4">
      <h1 className="text-center">My-Editor</h1>
      <form className="flex space-x-4" onSubmit={onSubmitNodeForm}>
        <input
          name="path"
          placeholder="path/to/node"
          className="w-full flex-grow"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button className="flex items-center space-x-2 rounded border-0 bg-glow font-bold">
          <Icons.Plus /> New node
        </button>
      </form>
      {visibleNodes.map((node) => (
        <Link
          key={node.id}
          to={`/n/${node.path}`}
          className="flex justify-space-between"
        >
          <div>
            <p className="text-text">{node.path}</p>
            <p className="text-xs text-caption">
              Last edit {formatDistance(now, node.updatedAt)} ago
            </p>
          </div>
          <button
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              nodeList.removeNode(node.id);
            }}
            className="flex items-center rounded border-0 bg-glow"
          >
            <Icons.Bin className="text-text" />
          </button>
        </Link>
      ))}
    </div>
  );
};

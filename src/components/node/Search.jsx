import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useNodeList from "hooks/useNodeList";

import { FlyOut } from "components/UI";

export default () => {
  const navigate = useNavigate();
  const [focus, setFocus] = useState({});
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const nodeList = useNodeList();
  const visibleNodes = nodeList.items.filter((node) =>
    node.path.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleShortkeys = (event) => {
      if (event.key === "g" && event.metaKey) {
        event.preventDefault();
        inputRef.current.focus();
      }
    };

    window.addEventListener("keydown", handleShortkeys);
    return () => {
      window.removeEventListener("keydown", handleShortkeys);
    };
  }, []);

  return (
    <>
      <form
        className="flex items-center"
        onSubmit={(event) => {
          event.preventDefault();
          if (visibleNodes.length > 0) {
            navigate(`/n/${visibleNodes[0].path}`);
            setQuery("");
          }
        }}
      >
        <input
          ref={inputRef}
          className="w-full"
          value={query}
          onFocus={() => setFocus((focus) => ({ ...focus, input: true }))}
          onBlur={() => setFocus((focus) => ({ ...focus, input: false }))}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Goto page (CMD+G)"
        />
      </form>
      <FlyOut
        usePortal={false}
        originRef={inputRef}
        isOpen={Object.values(focus).some(Boolean)}
        style={{ width: "20rem" }}
      >
        {visibleNodes.map((node) => (
          <Link
            key={node.id}
            className="block px-4 py-2 text-text"
            onFocus={() => setFocus((focus) => ({ ...focus, [node.id]: true }))}
            onBlur={() => setFocus((focus) => ({ ...focus, [node.id]: false }))}
            to={`/n/${node.path}`}
            onClick={() => setQuery("")}
          >
            {node.path}
          </Link>
        ))}
      </FlyOut>
    </>
  );
};

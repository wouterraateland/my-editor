import { v4 as uuidv4 } from "uuid";
import useLocallyStoredState from "./useLocallyStoredState";

export default () => {
  const [nodes, setNodes] = useLocallyStoredState({
    key: "my-editor__nodes",
    initialValue: [],
  });

  return {
    items: nodes,
    addNode: (params) => {
      const id = uuidv4();
      const newNode = {
        path: id,
        ...params,
        id,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      setNodes([...nodes, newNode]);
      return newNode;
    },
    updateNode: (id, update) =>
      setNodes(
        nodes.map((node) =>
          node.id === id ? { ...node, ...update, updatedAt: Date.now() } : node
        )
      ),
    removeNode: (id) => setNodes(nodes.filter((node) => node.id !== id)),
  };
};

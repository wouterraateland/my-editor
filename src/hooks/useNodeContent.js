import useLocallyStoredState from "./useLocallyStoredState";
import useNodeList from "./useNodeList";

export default (path) => {
  const nodeList = useNodeList();
  const node =
    nodeList.items.find((node) => node.path === path) ||
    nodeList.addNode({ path });

  const [, , nodeContentResource] = useLocallyStoredState({
    key: `my-editor__node-${node.id}`,
    initialValue: "",
  });

  return {
    node,
    nodeContentResource,
  };
};

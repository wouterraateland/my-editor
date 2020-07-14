import { storageResourceCache } from "resources";

import useResource from "./useResource";
import { useMemo } from "react";

const useLocallyStoredState = (params) => {
  const resource = useMemo(() => storageResourceCache.get(params), [params]);
  const state = useResource(resource);
  const setState = (v) => resource.setState(v);

  return [state, setState, resource];
};

export default useLocallyStoredState;

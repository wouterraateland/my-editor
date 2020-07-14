import { useEffect, useState } from "react";

const useUpstreamState = (upstreamState) => {
  const [state, setState] = useState(upstreamState);
  useEffect(() => setState(upstreamState), [upstreamState]);

  return [state, setState];
};

export default useUpstreamState;

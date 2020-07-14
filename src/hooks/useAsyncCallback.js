import { useCallback, useState } from "react";

const useAsyncCallback = (f, dependencies) => {
  const [isPending, setPending] = useState(false);

  const callback = useCallback(
    async (...args) => {
      if (typeof f === "function") {
        setPending(true);
        await f(...args);
        setPending(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies
  );

  return [isPending, callback];
};

export default useAsyncCallback;

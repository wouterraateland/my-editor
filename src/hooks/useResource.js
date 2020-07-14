import * as _ from "utils";
import { useEffect, useState } from "react";

const useResource = (
  resource,
  { onNext, onError = _.noop, onCompleted = _.noop } = {
    onNext: undefined,
    onError: _.noop,
    onCompleted: _.noop,
  }
) => {
  const [state, setState] = useState(undefined);

  useEffect(
    () =>
      resource.subscribe({
        onNext: onNext || setState,
        onError,
        onCompleted,
      }),
    [resource, onNext, onError, onCompleted]
  );

  return state === undefined ? resource.read() : state;
};
export default useResource;

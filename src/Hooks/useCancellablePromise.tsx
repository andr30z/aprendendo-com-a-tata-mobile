import { useCallback, useEffect, useRef } from "react";

interface PromiseInterface<P> {
  promise: Promise<P>;
  cancel: () => void;
}

function makeCancelable<P>(promise: Promise<P>, resolveOrRejectValue: boolean) {
  let isCanceled = false;
  const wrappedPromise = new Promise<P>((resolve, reject) => {
    promise
      .then((val) => {
        if (isCanceled) {
          return resolveOrRejectValue ? reject({ isCanceled }) : null;
        }
        resolve(val);
      })
      .catch((error) => {
        if (isCanceled) {
          return !resolveOrRejectValue ? null : reject({ isCanceled });
        }
        reject(error);
      });
  });
  return {
    promise: wrappedPromise,
    cancel: () => {
      isCanceled = true;
    },
  };
}

/**
 * This Hook creates a boilerplate logic to cancellable promises, that way there is no need to create multiple isMounted variables to avoid memory leaks.
 * @returns An object that contains a cancellablePromise function.
 * @author andr30z
 **/
export function useCancellablePromise() {
  const promises = useRef<Array<PromiseInterface<any>>>([]);

  useEffect(() => {
    //cancelando as promises
    return () => {
      promises.current.forEach((p) => p.cancel());
      promises.current = [];
    };
    //eslint-disable-next-line
  }, []);

  const cancellablePromise = useCallback(function <P>(
    p: Promise<P>,
    resolveOrRejectValue = false
  ) {
    const cPromise = makeCancelable<P>(p, resolveOrRejectValue);
    promises.current.push(cPromise);
    return cPromise.promise;
    //eslint-disable-next-line
  },
  []);
  return { cancellablePromise };
}

import { Dispatch, SetStateAction, useCallback, useState } from "react";

/**
 * Boolean logic abstraction, this is good to not repeat yourself during coding, like creating multiple
 * ()=> setValue(true) every time.
 * @param defaultValue optional boolean that describe the initial state.
 * @author andr30z
 **/
export function useBoolean(defaultValue?: boolean) {
  const [value, setValue] = useState(!!defaultValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((x) => !x), []);

  return { value, setValue, setTrue, setFalse, toggle };
}


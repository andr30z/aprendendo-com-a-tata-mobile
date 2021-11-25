import { useEffect } from "react";
import { useActivityPlayContext } from "../../Contexts";

/**
 * Hooks that holds the logic to know when the onEndActivity function should be executed
 * @author andr3z0
 **/
export function useOnEndActivity(condition: boolean, depsArray: Array<any>) {
  const { onEndActivity } = useActivityPlayContext();
  useEffect(() => {
    if (condition) onEndActivity();
  }, depsArray);
}

import { useState, useEffect } from "react";
/**
 *  This hook controls the current stage of an open activity.
 * @param useEffectListenerProp prop that triggers the ```validationCallback``` to be executed again.
 * @param validationCallback function that decides if the current stage should be changed. Return ```true``` to change stage.
 * @param onPassStageCallback function that is called immediately after the stage change occurs.
 * @author andr3z0
 **/
export function useStageLogic(
  useEffectListenerProp: any,
  validationCallback: () => boolean,
  onPassStageCallback: () => void
) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  useEffect(() => {
    if (validationCallback()) {
      setCurrentStageIndex((past) => past + 1);
      onPassStageCallback();
    }
  }, [useEffectListenerProp]);

  return { currentStageIndex, setCurrentStageIndex };
}

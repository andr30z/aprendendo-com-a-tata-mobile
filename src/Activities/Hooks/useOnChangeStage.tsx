import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { useActivityPlayContext } from "../../Contexts";

/**
 * Hooks that holds the logic to know when the onEndActivity function should be executed
 * @author andr3z0
 **/
export function useOnChangeStage<S>(
  state: Array<S>,
  setState: Dispatch<SetStateAction<Array<S>>>
) {
  const {
    currentStageIndex,
    activityAnswers,
    oldStageIndex,
    hasFinishedActivity,
    activityStageLength,
  } = useActivityPlayContext();
  console.log(state);
  //   const oldIndex = useMemo(() => currentStageIndex, [activityAnswers]);
  useEffect(() => {
    const onEffectReturn = (index: number = oldStageIndex.current) => {
      const activityAnswersCurrent = activityAnswers.current;
      const list = [...activityAnswersCurrent];
      list[index] = { activity: state };
      activityAnswers.current = list;
    };
    if (activityStageLength === undefined) return;
    if (hasFinishedActivity)
      return onEffectReturn(
        oldStageIndex.current === currentStageIndex
          ? currentStageIndex
          : oldStageIndex.current + 1
      );
    const activityAnswersCurrent = activityAnswers.current;

    if (activityAnswersCurrent[oldStageIndex.current])
      setState(activityAnswersCurrent[oldStageIndex.current]?.activity || []);

    return onEffectReturn;
  }, [currentStageIndex, hasFinishedActivity]);
}

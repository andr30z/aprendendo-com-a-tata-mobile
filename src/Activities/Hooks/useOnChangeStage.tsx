import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { useActivityPlayContext } from "../../Contexts";

/**
 * Hook that holds the logic about when the activity answers ref inside activity play context should be called and updated with new results
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
    isActivityResultView,
  } = useActivityPlayContext();
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
    const index = isActivityResultView
      ? currentStageIndex
      : oldStageIndex.current;
    if (activityAnswersCurrent[index])
      setState(activityAnswersCurrent[index]?.activity || []);
    if (isActivityResultView) return;
    return onEffectReturn;
  }, [currentStageIndex, hasFinishedActivity]);
}

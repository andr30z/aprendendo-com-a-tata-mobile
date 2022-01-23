import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { useActivityPlayContext } from "../../Contexts";

/**
 * Hook that holds the logic about when the activity answers ref inside activity play context should be called and updated with new results
 * @author andr30z
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
  const onEffectReturn = (index: number = oldStageIndex.current) => {
    const activityAnswersCurrent = activityAnswers.current;
    const list = [...activityAnswersCurrent];
    const activity = { activity: state };
    if (list[index] === undefined) list.push(activity);
    else list[index] = activity;
    activityAnswers.current = list;
  };

  useEffect(() => {
    if (isActivityResultView) return;
    if (hasFinishedActivity)
      onEffectReturn(
        oldStageIndex.current === currentStageIndex
          ? currentStageIndex
          : oldStageIndex.current + 1
      );
    else onEffectReturn();
  }, [currentStageIndex, hasFinishedActivity]);

  useEffect(() => {
    if (activityStageLength === undefined) return;
    const activityAnswersCurrent = activityAnswers.current;
    const index = currentStageIndex;
    setState(activityAnswersCurrent[index]?.activity || []);
  }, [currentStageIndex]);
}

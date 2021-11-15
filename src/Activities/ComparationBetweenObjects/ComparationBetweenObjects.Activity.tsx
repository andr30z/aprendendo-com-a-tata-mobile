import React, { useMemo, useState, useEffect } from "react";
import { WithDraxProvider } from "../../Components";
import { useActivityPlayContext } from "../../Contexts";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { useStageLogic } from "../../Hooks/useStageLogic";
import {
  ComparationBetweenObjectsActivity,
  ComparationBetweenObjectsActivityItem,
} from "../Interfaces";
import { ComparationDragItem } from "./Components";
import { ArrayBonds } from "./Interfaces";

const filterFunction =
  (receiver: boolean) => (comparation: ComparationBetweenObjectsActivityItem) =>
    comparation.receiver === receiver;

/**
 *
 * @author andr3z0
 **/
const ComparationBetweenObjects =
  WithDraxProvider<ComparationBetweenObjectsActivity>(({ activity }) => {
    const [currentStageBonds, setCurrentStageBonds] = useState<ArrayBonds>([]);
    const { onEndActivity, setActivityAnswers } = useActivityPlayContext();
    const { currentStageIndex } = useStageLogic(
      currentStageBonds,
      () =>
        currentStageBonds.length === columns.left.length &&
        currentStageIndex !== activity.stages.length - 1,
      () => {
        setActivityAnswers((past) => [
          ...past,
          { activity: currentStageBonds },
        ]);
        setCurrentStageBonds([]);
      }
    );

    useEffect(() => {
      //user has ended activity
      if (
        currentStageIndex === activity.stages.length - 1 &&
        currentStageBonds.length === columns.left.length
      )
        onEndActivity();
    }, [currentStageIndex, currentStageBonds]);

    const currentStage = activity.stages[currentStageIndex];
    const columns = useMemo(() => {
      const leftColumn = currentStage.filter(filterFunction(false));
      const rightColumn = currentStage.filter(filterFunction(true));
      return {
        left: leftColumn,
        right: rightColumn,
      };
    }, [currentStage]);

    return (
      <BaseContainer flex={1}>
        <BaseContainer justify="center" align="center" flex={0.3}>
          <BaseText color="#000">{activity.activityUtterance}</BaseText>
        </BaseContainer>
        <BaseContainer flex={1} flexDirection="row" justify="center">
          <BaseContainer
            flexDirection="column"
            style={{ marginRight: 5 }}
            justify="space-evenly"
          >
            {columns.left.map((item) => (
              <ComparationDragItem
                currentStageBonds={currentStageBonds}
                setCurrentStageBonds={setCurrentStageBonds}
                key={item._id}
                comparation={item}
              />
            ))}
          </BaseContainer>
          <BaseContainer flexDirection="column" justify="space-evenly">
            {columns.right.map((item) => (
              <ComparationDragItem
                currentStageBonds={currentStageBonds}
                setCurrentStageBonds={setCurrentStageBonds}
                key={item._id}
                comparation={item}
              />
            ))}
          </BaseContainer>
        </BaseContainer>
      </BaseContainer>
    );
  });

export default ComparationBetweenObjects;

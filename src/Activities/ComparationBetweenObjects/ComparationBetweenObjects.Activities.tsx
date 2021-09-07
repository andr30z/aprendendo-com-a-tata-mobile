import React, { useMemo, useState } from "react";
import { DraxProvider } from "react-native-drax";
import { WithDraxProvider } from "../../Components";
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
    const { currentStageIndex } = useStageLogic(
      currentStageBonds,
      () =>
        currentStageBonds.length === columns.left.length &&
        currentStageIndex !== activity.stages.length - 1,
      () => setCurrentStageBonds([])
    );
    const currentStage = useMemo(
      () => activity.stages[currentStageIndex],
      [currentStageIndex]
    );
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

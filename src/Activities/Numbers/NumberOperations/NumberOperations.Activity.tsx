import React, { useState } from "react";
import { useWindowDimensions } from "react-native";
import { DraxScrollView } from "react-native-drax";
import { WithDraxProvider } from "../../../Components";
import { BaseText } from "../../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../../GlobalStyles/Containers.Style";
import { useStageLogic } from "../../../Hooks/useStageLogic";
import {
  NumberOperationsActivityStageInterface,
  OperationResult,
} from "../../Interfaces/Numbers/NumberOperations";
import { NumericExpression } from "./Components";

interface NumberOperationsProps {
  activity: NumberOperationsActivityStageInterface;
}

/**
 *
 * @author andr3z0
 **/
const NumberOperations = WithDraxProvider<NumberOperationsProps>(
  ({ activity }) => {
    const [operationsResults, setOperationsResults] = useState<OperationResult>(
      []
    );
    const { currentStageIndex } = useStageLogic(
      operationsResults,
      () =>
        activity.stages[currentStageIndex].operations.length ===
        operationsResults.length,
      () => setOperationsResults([])
    );
    const currentStage = activity.stages[currentStageIndex];
    const { height } = useWindowDimensions();
    return (
      <BaseContainer flex={1}>
        <DraxScrollView style={{ height }}>
          <BaseContainer flex={1} marginTop="25px">
            <BaseText align="center" color="black" fontSize="25px">
              {activity.activityUtterance}
            </BaseText>
          </BaseContainer>
          <BaseContainer paddingHorizontal="2%" flexDirection="column">
            {currentStage.operations.map((item) => (
              <NumericExpression
                key={item._id}
                operationItem={item}
                operationsResults={operationsResults}
                setOperationsResults={setOperationsResults}
              />
            ))}
          </BaseContainer>
        </DraxScrollView>
      </BaseContainer>
    );
  }
);

export default NumberOperations;

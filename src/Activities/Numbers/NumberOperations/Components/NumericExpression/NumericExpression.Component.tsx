import React, { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { useWindowDimensions, Image } from "react-native";
import { DraxDragWithReceiverEventData, DraxView } from "react-native-drax";
import { useActivityPlayContext } from "../../../../../Contexts";
import { BaseText } from "../../../../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../../../../GlobalStyles/Containers.Style";
import { getRandomInt, shuffleArray } from "../../../../../Utils";
import {
  OperationItem,
  OperationResult,
} from "../../../../Interfaces/Numbers/NumberOperations";

interface NumberSequenceItemProps {
  operationItem: OperationItem;
  operationsResults: OperationResult;
  setOperationsResults: Dispatch<SetStateAction<OperationResult>>;
}

/**
 *
 * @author andr30z
 **/
const NumericExpression: React.FC<NumberSequenceItemProps> = React.memo(
  ({ operationItem, operationsResults, setOperationsResults }) => {
    const { isActivityResultView } = useActivityPlayContext();
    const resultApplied = useMemo(
      () =>
        operationsResults.find(
          (op) =>
            op.operationId === operationItem._id &&
            op.result === operationItem.result
        ),
      [operationsResults]
    );
    const onReceiveDragDrop = useCallback(
      (data: DraxDragWithReceiverEventData) => {
        if (resultApplied) return console.log("TEM RESULTADO AQUI JÁ MAN");
        // if (!isReceptive || index === undefined || !answer)
        //   return console.log("falhou no segundo if");
        const payload: number = data.dragged.payload;
        const isDropResultCorrect = operationItem.result === payload;
        if (!isDropResultCorrect) return console.log("errou");

        setOperationsResults((past) => [
          ...past,
          { operationId: operationItem._id, result: payload },
        ]);
      },
      [resultApplied, operationItem]
    );

    const resultsArray: Array<number> = useMemo(() => {
      const possibleResultsArray: Array<number> = [];
      possibleResultsArray.push(operationItem.result);
      const NUMBER_LIMIT = 5;
      for (let index = 0; index < NUMBER_LIMIT; index++) {
        let min = 0;
        let max = Math.abs(operationItem.result);
        if (operationItem.result === 0) {
          min = -NUMBER_LIMIT;
          max = NUMBER_LIMIT;
        }
        if (operationItem.result < 0) {
          min = operationItem.result;
          max = NUMBER_LIMIT;
        }
        possibleResultsArray.push(getRandomInt(min, max));
      }

      const uniqueItems = Array.from(
        new Set([...shuffleArray(possibleResultsArray)])
      );
      return uniqueItems;
    }, [operationItem]);

    const { height } = useWindowDimensions();
    return (
      <BaseContainer
        height={`${(height * 90) / 100}px`}
        marginVertical="25px"
        paddingHorizontal="2%"
        flexDirection="column"
        align="center"
        justify="center"
        marginTop="20px"
      >
        <BaseContainer flexWrap="wrap" align="flex-start" flexDirection="row">
          {operationItem.inputs.map((input) => {
            return (
              <BaseContainer
                flexWrap="wrap"
                key={input._id}
                flexDirection="row"
                marginVertical="10px"
              >
                {input.image ? (
                  <Image
                    resizeMode="contain"
                    style={{ height: 80, width: 80 }}
                    source={{ uri: input.image }}
                  />
                ) : (
                  <BaseText
                    style={{ marginHorizontal: 10 }}
                    color="black"
                    fontSize="40px"
                  >
                    {input.numberValue}
                  </BaseText>
                )}
                {input.operation && (
                  <BaseText
                    style={{ marginHorizontal: 10, alignSelf: "center" }}
                    fontSize="25px"
                    fontWeight="bold"
                    color="#000"
                    align="center"
                  >
                    {input.operation}
                  </BaseText>
                )}
              </BaseContainer>
            );
          })}
        </BaseContainer>
        <BaseContainer flex={1}>
          <BaseText align="center" color="black" fontSize="100px">
            =
          </BaseText>
        </BaseContainer>
        <DraxView
          style={{
            borderWidth: 1,
            width: "100%",
            borderRadius: 10,
          }}
          receptive
          isParent={false}
          onReceiveDragDrop={onReceiveDragDrop}
        >
          <BaseContainer style={{ alignItems: "center" }}>
            <BaseText color="black" fontWeight="bold" fontSize="60px">
              {resultApplied?.result}
            </BaseText>
          </BaseContainer>
        </DraxView>

        <BaseContainer
          marginTop="20px"
          flexDirection="row"
          justify="center"
          flexWrap="wrap"
          flex={1}
        >
          {resultsArray.map((value, index) => (
            <DraxView
              key={index}
              draggable={!isActivityResultView}
              payload={value}
            >
              <BaseContainer
                borderRadius={"5px"}
                boxShadow="10px 5px 5px #000"
                marginVertical="15px"
                marginHorizontal="15px"
                height="50px"
                width="50px"
                style={{
                  borderWidth: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                backgroundColor="#fff"
              >
                <BaseText color="#000" fontSize="30px" align="center">
                  {value}
                </BaseText>
              </BaseContainer>
            </DraxView>
          ))}
        </BaseContainer>
      </BaseContainer>
    );
  }
);

export default NumericExpression;

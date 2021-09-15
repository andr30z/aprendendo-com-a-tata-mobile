import React, { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { View } from "react-native";
import { DraxDragWithReceiverEventData, DraxView } from "react-native-drax";
import { BaseText } from "../../../../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../../../../GlobalStyles/Containers.Style";
import { getRandomInt } from "../../../../../Utils";

interface NumberSequenceItemProps {
  numberItem: string | number;
  sequence: Array<number | string>;
  setSequence: Dispatch<SetStateAction<Array<number | string>>>;
  isAnswerGrid?: boolean;
  index?: number;
  answer?: Array<number | string>;
}

const colorsArray = [
  { textColor: "#fff", background: "#abc3f3" },
  { background: "#e32636", textColor: "#fff" },
  { background: "#33ce55", textColor: "#fff" },
  { background: "#2d4a58", textColor: "#fff" },
  { background: "#d9a0af", textColor: "#fff" },
  { background: "#9345ee", textColor: "#fff" },
];
/**
 *
 * @author andr3z0
 **/
const NumberSequenceItem: React.FC<NumberSequenceItemProps> = React.memo(
  ({ numberItem, isAnswerGrid, sequence, setSequence, index, answer }) => {
    const isReceptive = typeof numberItem !== "number";
    const randomStyle = useMemo(
      () => colorsArray[getRandomInt(0, colorsArray.length - 1)],
      []
    );
    const onReceiveDragDrop = useCallback(
      (data: DraxDragWithReceiverEventData) => {
        if (!isReceptive || index === undefined || !answer)
          return console.log("falhou no segundo if");
        const payload: number = data.dragged.payload;
        const isCurrentDropCorrectPlace = answer[index] === payload;
        if (!isCurrentDropCorrectPlace) return console.log("errou");

        setSequence((past) => {
          const list = [...past];
          list[index] = data.dragged.payload;
          return list;
        });
      },
      [sequence, index]
    );
    return (
      <DraxView
        receptive={isReceptive}
        draggable={!isAnswerGrid}
        onReceiveDragDrop={onReceiveDragDrop}
        payload={numberItem}
      >
        <View style={{ height: 50, width: 50 }}>
          <BaseContainer
            align="center"
            borderRadius={"10px"}
            backgroundColor={isReceptive ? "#fff" : randomStyle.background}
            flex={1}
            marginVertical="3px"
            marginHorizontal="3px"
            justify="center"
          >
            <BaseText color={randomStyle.textColor}>{numberItem}</BaseText>
          </BaseContainer>
        </View>
      </DraxView>
    );
  }
);

export default NumberSequenceItem;

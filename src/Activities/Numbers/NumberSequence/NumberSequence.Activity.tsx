import React, { useMemo, useState } from "react";
import { WithDraxProvider } from "../../../Components";
import { useActivityPlayContext } from "../../../Contexts";
import { BaseText } from "../../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../../GlobalStyles/Containers.Style";
import { shuffleArray } from "../../../Utils";
import { useOnChangeStage } from "../../Hooks";
import { NumberSequenceActivityStageInterface } from "../../Interfaces/Numbers";
import { NumberSequenceItem } from "./Components";

interface NumberSequenceProps {
  activity: NumberSequenceActivityStageInterface;
}

/**
 *
 * @author andr30z
 **/
const NumberSequence = WithDraxProvider<NumberSequenceProps>(({ activity }) => {
  const { currentStageIndex } = useActivityPlayContext();
  const currentStage = activity.stages[currentStageIndex];
  const [sequence, setSequence] = useState(currentStage.sequence);
  useOnChangeStage(sequence, setSequence);
  const sequenceMissingItems = useMemo(() => {
    const arrayOfMissingNumbers: Array<string | number> = [];
    sequence.forEach((number, index) => {
      if (typeof number !== "number") arrayOfMissingNumbers.push(index + 1);
    });
    return arrayOfMissingNumbers;
  }, [sequence]);

  const shuffledSequenceMissingItems = useMemo(
    () =>
      sequenceMissingItems.length > 0
        ? sequenceMissingItems
        : shuffleArray(sequenceMissingItems),
    [sequenceMissingItems]
  );
  const answer = useMemo(
    () =>
      [
        ...sequenceMissingItems,
        ...sequence.filter((x) => typeof x === "number"),
      ].sort((a, b) => Number(a) - Number(b)),
    [sequence, sequenceMissingItems]
  );
  return (
    <BaseContainer paddingHorizontal="1%" flex={1} flexDirection="column">
      <BaseContainer flex={1} align="center" justify="center">
        <BaseText color="black">{activity.activityUtterance}</BaseText>
      </BaseContainer>
      <BaseContainer flex={2} flexWrap="wrap" flexDirection="row">
        {sequence.map((item, index) => (
          <NumberSequenceItem
            originalSequence={currentStage.sequence}
            key={index}
            numberItem={item}
            answer={answer}
            index={index}
            sequence={sequence}
            isAnswerGrid
            setSequence={setSequence}
          />
        ))}
      </BaseContainer>
      <BaseContainer flexWrap="wrap" flexDirection="row" flex={1}>
        {shuffledSequenceMissingItems.map((number) => (
          <NumberSequenceItem
            originalSequence={currentStage.sequence}
            numberItem={number}
            key={number}
            sequence={sequence}
            setSequence={setSequence}
          />
        ))}
      </BaseContainer>
    </BaseContainer>
  );
});

export default NumberSequence;

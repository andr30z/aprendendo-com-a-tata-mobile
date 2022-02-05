import React, { useState, useEffect, useMemo } from "react";
import { WithDraxProvider } from "../../../Components";
import { BaseText } from "../../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../../GlobalStyles/Containers.Style";
import { useStageLogic } from "../../../Hooks/useStageLogic";
import { CompleteWordsByImagesAndLettersActivityStageInterface } from "../../Interfaces";
import { DraxScrollView } from "react-native-drax";
import { DragLettersToCompleteWordsItem } from "./Components";
import { useCompleteWordsLogic, useOnChangeStage } from "../../Hooks";
import { useActivityPlayContext } from "../../../Contexts";
import { useCompleteWordsInit } from "../Hooks/useCompleWordsInit";
interface ImagesByLettersProps {
  activity: CompleteWordsByImagesAndLettersActivityStageInterface;
}

/**
 *
 * @author andr30z
 **/
const DragLettersToCompleteWords = WithDraxProvider<ImagesByLettersProps>(
  ({ activity }) => {
    const { currentStageIndex } = useActivityPlayContext();
    const currentStage = activity.stages[currentStageIndex];
    const { completeWords, setCompleteWords } = useCompleteWordsLogic(
      currentStageIndex,
      currentStage
    );
    useOnChangeStage(completeWords, setCompleteWords);
    useCompleteWordsInit(completeWords, setCompleteWords, currentStage);

    return (
      <BaseContainer flex={1}>
        <DraxScrollView>
          <BaseContainer
            flex={1}
            align="center"
            justify="center"
            marginVertical="5px"
            marginTop="25px"
          >
            <BaseText
              align="center"
              fontWeight="bold"
              fontSize="18px"
              color="#000"
            >
              {activity.activityUtterance}
            </BaseText>
          </BaseContainer>
          <BaseContainer flex={5} flexDirection="column">
            {currentStage.wordsToComplete.map((item, index) => (
              <DragLettersToCompleteWordsItem
                key={item._id}
                completeWords={completeWords}
                index={index}
                setCompleteWords={setCompleteWords}
                wordItem={item}
              />
            ))}
          </BaseContainer>
        </DraxScrollView>
      </BaseContainer>
    );
  }
);

export default DragLettersToCompleteWords;

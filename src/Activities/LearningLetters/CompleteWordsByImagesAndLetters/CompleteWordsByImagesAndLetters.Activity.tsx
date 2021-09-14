import React, { useState, useEffect, useMemo } from "react";
import { WithDraxProvider } from "../../../Components";
import { BaseText } from "../../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../../GlobalStyles/Containers.Style";
import { useStageLogic } from "../../../Hooks/useStageLogic";
import { CompleteWordsByImagesAndLettersActivityStageInterface } from "../../Interfaces";
import { DraxScrollView } from "react-native-drax";
import { CompleteWordsByImagesAndLettersItem } from "./Components";
interface ImagesByLettersProps {
  activity: CompleteWordsByImagesAndLettersActivityStageInterface;
}

/**
 *
 * @author andr3z0
 **/
const CompleteWordsByImagesAndLetters = WithDraxProvider<ImagesByLettersProps>(
  ({ activity }) => {
    const { currentStageIndex } = useStageLogic(
      false,
      () => false,
      () => false
    );
    //   useScreenOrientation(5, 2);
    const currentStage = activity.stages[currentStageIndex];
    const [completeWords, setCompleteWords] = useState<Array<string>>([]);
    useEffect(() => {
      setCompleteWords(
        currentStage.wordsToComplete.map((item) => item.wordToComplete)
      );
    }, [currentStageIndex]);

    // const wordsActivity = useMemo(() => {
    //   if (currentStage.wordsToComplete.length % 2 === 0)
    //     return currentStage.wordsToComplete;
    //   return [
    //     ...currentStage.wordsToComplete,
    //     { wordsToComplete: [], _id: "" },
    //   ];
    // }, []);

    return (
      <BaseContainer flex={1} >
        <DraxScrollView>
          <BaseContainer
            flex={1}
            align="center"
            justify="center"
            marginVertical="5px"
          >
            <BaseText align="center" color="#000">
              {activity.activityUtterance}
            </BaseText>
          </BaseContainer>
          <BaseContainer
            flex={5}
            justify="space-around"
            flexDirection="row"
            flexWrap="wrap"
            paddingHorizontal="5%"
          >
            {currentStage.wordsToComplete.map((item, index) => (
              <CompleteWordsByImagesAndLettersItem
                key={item._id}
                completeWords={completeWords}
                index={index}
                setCompleteWords={setCompleteWords}
                wordItem={item}
              />
            ))}
            {currentStage.wordsToComplete.length % 2 !== 0 && (
              <BaseContainer width="45%" />
            )}
          </BaseContainer>
        </DraxScrollView>
      </BaseContainer>
    );
  }
);

export default CompleteWordsByImagesAndLetters;

import React from "react";
import { DraxScrollView } from "react-native-drax";
import { WithDraxProvider } from "../../../Components";
import { useActivityPlayContext } from "../../../Contexts";
import { BaseText } from "../../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../../GlobalStyles/Containers.Style";
import { useStageLogic } from "../../../Hooks/useStageLogic";
import { useCompleteWordsLogic, useOnChangeStage } from "../../Hooks";
import { CompleteWordsByImagesAndLettersActivityStageInterface } from "../../Interfaces";
import { CompleteWordsByImagesAndLettersItem } from "./Components";
interface ImagesByLettersProps {
  activity: CompleteWordsByImagesAndLettersActivityStageInterface;
}

/**
 *
 * @author andr30z
 **/
const CompleteWordsByImagesAndLetters = WithDraxProvider<ImagesByLettersProps>(
  ({ activity }) => {
    const { currentStageIndex } = useActivityPlayContext();
    const currentStage = activity.stages[currentStageIndex];
    const { setCompleteWords, completeWords } = useCompleteWordsLogic(
      currentStageIndex,
      currentStage
    );
    useOnChangeStage(completeWords, setCompleteWords);

    return (
      <BaseContainer flex={1}>
        <DraxScrollView>
          <BaseContainer
            flex={1}
            align="center"
            justify="center"
            marginVertical="5px"
            paddingHorizontal="1%"
            marginTop="15px"
          >
            <BaseText align="center" color="#000">
              {activity.activityUtterance}
            </BaseText>
          </BaseContainer>
          <BaseContainer flex={5} flexDirection="column" paddingHorizontal="5%">
            {currentStage.wordsToComplete.map((item, index) => (
              <CompleteWordsByImagesAndLettersItem
                key={item._id}
                completeWords={completeWords}
                index={index}
                setCompleteWords={setCompleteWords}
                wordItem={item}
              />
            ))}
            {/* {currentStage.wordsToComplete.length % 2 !== 0 && (
              <BaseContainer width="45%" />
            )} */}
          </BaseContainer>
        </DraxScrollView>
      </BaseContainer>
    );
  }
);

export default CompleteWordsByImagesAndLetters;

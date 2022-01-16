import React, { useState } from "react";
import { useActivityPlayContext } from "../../Contexts";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import {
  BaseContainer,
  ScrollContainer,
} from "../../GlobalStyles/Containers.Style";
import { useStageLogic } from "../../Hooks";
import { useOnChangeStage } from "../Hooks";
import { LearningCharacteristicsOfThingsActivityStageInterface } from "../Interfaces";
import { LearningCharacteristicsOfThingsItem } from "./Components";

interface LearningCharacteristicsOfThingsProps {
  activity: LearningCharacteristicsOfThingsActivityStageInterface;
}

/**
 *
 * @author andr30z
 **/
const LearningCharacteristicsOfThings: React.FC<LearningCharacteristicsOfThingsProps> =
  ({ activity }) => {
    const [pressedImages, setPressedImages] = useState<Array<string>>([]);
    const { currentStageIndex } = useActivityPlayContext();
    useOnChangeStage(pressedImages, setPressedImages);
    const currentStage = activity.stages[currentStageIndex];
    return (
      <BaseContainer flex={1}>
        <ScrollContainer>
          <BaseContainer
            align="center"
            justify="center"
            marginTop="55px"
            paddingHorizontal="5%"
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
          <BaseContainer
            marginTop="55px"
            align="center"
            justify="center"
            flexDirection="row"
            backgroundColor="white"
            marginHorizontal="2%"
            borderRadius="10px"
            style={{
              elevation:4
            }}
            flexWrap="wrap"
          >
            {currentStage.characteristicsItems.map((item, index) => (
              <LearningCharacteristicsOfThingsItem
                key={item._id}
                setPressedImages={setPressedImages}
                index={index}
                pressedImages={pressedImages}
                characteristicItem={item}
              />
            ))}
          </BaseContainer>
        </ScrollContainer>
      </BaseContainer>
    );
  };

export default LearningCharacteristicsOfThings;

import React, { useState } from "react";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import {
  BaseContainer,
  ScrollContainer,
} from "../../GlobalStyles/Containers.Style";
import { useStageLogic } from "../../Hooks";
import { LearningCharacteristicsOfThingsActivityStageInterface } from "../Interfaces";
import { LearningCharacteristicsOfThingsItem } from "./Components";

interface LearningCharacteristicsOfThingsProps {
  activity: LearningCharacteristicsOfThingsActivityStageInterface;
}

/**
 *
 * @author andr3z0
 **/
const LearningCharacteristicsOfThings: React.FC<LearningCharacteristicsOfThingsProps> =
  ({ activity }) => {
    const { currentStageIndex } = useStageLogic(
      false,
      () => false,
      () => false
    );
    const currentStage = activity.stages[currentStageIndex];
    const [pressedImages, setPressedImages] = useState<Array<string>>([]);
    return (
      <BaseContainer flex={1}>
        <ScrollContainer>
          <BaseContainer
            align="center"
            justify="center"
            marginTop="55px"
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
          <BaseContainer marginTop="55px" align="center" justify="center" flexDirection="row" flexWrap="wrap">
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

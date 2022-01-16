import React, { useState, useEffect } from "react";
import { useActivityPlayContext } from "../../../Contexts";
import { BaseText } from "../../../GlobalStyles/BaseStyles";
import {
  BaseContainer,
  ScrollContainer,
} from "../../../GlobalStyles/Containers.Style";
import { useScreenOrientation } from "../../../Hooks/useScreenOrientation";
import { useStageLogic } from "../../../Hooks/useStageLogic";
import { useOnChangeStage } from "../../Hooks";
import {
  ImagesByLettersActivityStageInterface,
  PressedImagesInterface,
} from "../../Interfaces";
import { ImagesByLettersItem } from "./Components";

interface ImagesByLettersProps {
  activity: ImagesByLettersActivityStageInterface;
}

/**
 *
 * @author andr30z
 **/
const ImagesByLetters: React.FC<ImagesByLettersProps> = ({ activity }) => {
  
  const [pressedImagesId, setPressedImagesId] =
  useState<PressedImagesInterface>([]);
  
  const { currentStageIndex } = useActivityPlayContext();
  const currentStage = activity.stages[currentStageIndex];
  
  useOnChangeStage(pressedImagesId, setPressedImagesId);

  useScreenOrientation(5, 2);
  useEffect(() => {
    setPressedImagesId(
      currentStage.pressingLettersActivity.map((item) => ({
        imagesContainerId: item._id,
        pressed: [],
      }))
    );
  }, [currentStageIndex]);

  return (
    <BaseContainer flex={1}>
      <ScrollContainer>
        <BaseContainer align="center" justify="center" marginVertical="30px">
          <BaseText color="#000">{activity.activityUtterance}</BaseText>
        </BaseContainer>

        <BaseContainer flex={4}>
          {currentStage.pressingLettersActivity.map((item, index) => (
            <ImagesByLettersItem
              key={item._id}
              letterItem={item}
              index={index}
              pressedItems={pressedImagesId}
              setPressedImagesId={setPressedImagesId}
            />
          ))}
        </BaseContainer>
      </ScrollContainer>
    </BaseContainer>
  );
};

export default ImagesByLetters;

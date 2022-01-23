import React, { Dispatch, SetStateAction } from "react";
import { Image, useWindowDimensions } from "react-native";
import { DraxView } from "react-native-drax";
import { ACTIVITY_CONSTANTS } from "../../../../../Constants/index";
import { useActivityPlayContext } from "../../../../../Contexts";
import { BaseText } from "../../../../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../../../../GlobalStyles/Containers.Style";
import { useLettersItemLogic } from "../../../../Hooks";
import { WordsToCompleteItem } from "../../../../Interfaces";

interface CompleteWordsByImagesAndLettersItemProps {
  wordItem: WordsToCompleteItem;
  setCompleteWords: Dispatch<SetStateAction<Array<string>>>;
  completeWords: Array<string>;
  index: number;
}

/**
 *
 * @author andr30z
 **/
const CompleteWordsByImagesAndLettersItem: React.FC<
  CompleteWordsByImagesAndLettersItemProps
> = ({ wordItem, index, completeWords, setCompleteWords }) => {
  const { letters, onDragReceive } = useLettersItemLogic(
    completeWords[index],
    wordItem
  );
  const { height } = useWindowDimensions();
  const { isActivityResultView } = useActivityPlayContext();
  return (
    <BaseContainer
      width="100%"
      height={`${(height * 25) / 100}px`}
      marginVertical="15px"
      flexDirection="row"
    >
      <BaseContainer
        flex={5}
        flexDirection="column"
        align="center"
        justify="space-between"
        style={{ marginRight: 5 }}
      >
        <BaseContainer align="center" justify="center" marginBottom="20px">
          <Image
            resizeMode="center"
            style={{ height: 180, width: 110 }}
            source={{ uri: wordItem.image }}
          />
        </BaseContainer>
        <BaseContainer height="25%" flexDirection="row">
          {letters?.map((letter, idx) => (
            <BaseContainer flex={1} align="center" justify="center" key={idx}>
              {letter ===
              ACTIVITY_CONSTANTS.ACTIVITY_WORD_RECEPTIVE_BOX_FLAG ? (
                <DraxView
                  receptive
                  onReceiveDragDrop={onDragReceive({
                    index,
                    setCompleteWords,
                  })}
                >
                  <BaseContainer
                    style={{ borderWidth: 1, borderStyle: "solid" }}
                    paddingHorizontal="20px"
                    paddingVertical="20px"
                    backgroundColor="white"
                  />
                </DraxView>
              ) : (
                <BaseText
                  color="black"
                  fontSize="25px"
                  fontWeight="bold"
                  style={{ marginHorizontal: 3 }}
                >
                  {letter}
                </BaseText>
              )}
            </BaseContainer>
          ))}
        </BaseContainer>
      </BaseContainer>
      <BaseContainer
        style={{
          borderWidth: 2,
          borderTopWidth: 2,
          borderBottomWidth: 0,
        }}
        flex={1}
        flexDirection="column"
        justify="space-evenly"
      >
        {wordItem.optionLetters.map((option, idx) => (
          <BaseContainer
            key={option + idx}
            style={{
              borderBottomWidth: 2,
            }}
            align="center"
            justify="center"
            backgroundColor="red"
            
            flex={1}
          >
            <DraxView
              renderToHardwareTextureAndroid
              draggable={!isActivityResultView}
              payload={{ option, index }}
            >
              <BaseText fontWeight="bold" color="black" fontSize="25px">
                {option}
              </BaseText>
            </DraxView>
          </BaseContainer>
        ))}
      </BaseContainer>
    </BaseContainer>
  );
};

export default CompleteWordsByImagesAndLettersItem;

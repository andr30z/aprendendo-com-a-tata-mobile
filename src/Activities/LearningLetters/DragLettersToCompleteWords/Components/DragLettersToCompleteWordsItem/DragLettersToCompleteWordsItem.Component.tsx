import React, { Dispatch, SetStateAction } from "react";
import { Image, useWindowDimensions } from "react-native";
import { DraxView } from "react-native-drax";
import { ACTIVITY_CONSTANTS } from "../../../../../Constants/index";
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
 * @author andr3z0
 **/
const DragLettersToCompleteWordsItem: React.FC<CompleteWordsByImagesAndLettersItemProps> =
  ({ wordItem, index, completeWords, setCompleteWords }) => {
    const { letters, onDragReceive } = useLettersItemLogic(
      completeWords[index],
      wordItem
    );

    const { height, width } = useWindowDimensions();
    return (
      <BaseContainer
        style={{
          height: height * 0.45,
        }}
        width="100%"
        // backgroundColor="red"
        marginVertical="25px"
        paddingHorizontal="10px"
        flexDirection="column"
      >
        <BaseContainer flex={2} flexDirection="column" align="center">
          <BaseContainer flex={1} align="center" justify="center">
            <Image
              style={{ height: 100, width: 100 }}
              resizeMode="center"
              source={{ uri: wordItem.image }}
            />
          </BaseContainer>
          <BaseContainer flex={1} flexDirection="row" width={`${width}px`}>
            {letters?.map((letter, idx) => (
              <BaseContainer flex={1} align="center" justify="center" key={idx}>
                {letter ===
                ACTIVITY_CONSTANTS.ACTIVITY_WORD_RECEPTIVE_BOX_FLAG ? (
                  <DraxView
                    receptive
                    onReceiveDragDrop={onDragReceive({
                      index,
                      setCompleteWords,
                      keyLetterFormatter: () =>
                        wordItem.finishedWord ? wordItem.finishedWord[idx] : "",
                      positionToReplace: idx,
                    })}
                  >
                    <BaseContainer
                      style={{ borderWidth: 1, borderStyle: "solid" }}
                      paddingHorizontal="15px"
                      paddingVertical="15px"
                      backgroundColor="white"
                    />
                  </DraxView>
                ) : (
                  <BaseText
                    color="black"
                    // fontSize="50px"
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
          flex={2}
          flexDirection="row"
          flexWrap="wrap"
          justify="center"
          style={{ borderWidth: 1 }}
        >
          {wordItem.optionLetters.map((option, idx) => (
            <DraxView
              key={String(option + "_" + idx + "_" + index)}
              draggable
              payload={{ option, index }}
            >
              <BaseText
                style={{ marginRight: 8 }}
                fontWeight="bold"
                color="black"
                fontSize="23px"
              >
                {option}
              </BaseText>
            </DraxView>
          ))}
        </BaseContainer>
      </BaseContainer>
    );
  };

export default DragLettersToCompleteWordsItem;

import React, { Dispatch, SetStateAction, useMemo } from "react";
import { useWindowDimensions } from "react-native";
import { DraxView } from "react-native-drax";
import { BaseText } from "../../../../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../../../../GlobalStyles/Containers.Style";
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
const CompleteWordsByImagesAndLettersItem: React.FC<CompleteWordsByImagesAndLettersItemProps> =
  ({ wordItem, index, completeWords, setCompleteWords }) => {
    const Image = wordItem.image;
    const letters = useMemo(
      () => completeWords[index]?.split(""),
      [completeWords, index]
    );
    const { height } = useWindowDimensions();
    return (
      <BaseContainer
        width="100%"
        height={`${(height * 20) / 100}px`}
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
          <BaseContainer align="center" justify="center">
            <Image height="180" width="110" />
          </BaseContainer>
          <BaseContainer height="25%" flexDirection="row">
            {letters?.map((letter, idx) => (
              <BaseContainer flex={1} align="center" justify="center" key={idx}>
                {letter === "*" ? (
                  <DraxView
                    receptive
                    onReceiveDragDrop={({ dragged: { payload } }) => {
                      if (
                        payload.option !== wordItem.keyLetter ||
                        payload.index !== index
                      )
                        return console.log("errou");

                      setCompleteWords((past) => {
                        const list = [...past];
                        list[index] = list[index].replace("*", payload.option);
                        return list;
                      });
                    }}
                  >
                    <BaseContainer
                      // width="10px"
                      // height="10px"
                      style={{ borderWidth: 1, borderStyle: "solid" }}
                      paddingHorizontal="10px"
                      paddingVertical="10px"
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
          {wordItem.optionLetters.map((option, optIndex) => (
            <BaseContainer
              key={option}
              style={{
                borderBottomWidth: 2,
              }}
              align="center"
              justify="center"
              flex={1}
            >
              <DraxView draggable payload={{ option, index }}>
                <BaseText fontWeight="bold" color="black" fontSize="40px">
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

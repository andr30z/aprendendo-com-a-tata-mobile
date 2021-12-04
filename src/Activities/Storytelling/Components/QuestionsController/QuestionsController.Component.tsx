import { AntDesign, Entypo } from "@expo/vector-icons";
import React from "react";
import { Pressable } from "react-native";
import { useActivityPlayContext } from "../../../../Contexts";
import { BaseText } from "../../../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../../../GlobalStyles/Containers.Style";
import { StoryActivityAnswer } from "../../../Interfaces";
import { ButtonActivity, LinearGradientButtonContainer } from "./Styles";

type SetPageCallbackType = (currentPage: number) => number;
interface QuestionsControllerProps {
  questionPosition: number;
  setCurrentPagePosition: (cb: SetPageCallbackType) => void;
  questionLimit: number;
  storyActivityAnswer: StoryActivityAnswer;
  showBtnSendActivity?: boolean;
}

/**
 *
 * @author andr3z0
 **/
const QuestionsController = React.memo<QuestionsControllerProps>(
  ({
    questionPosition,
    setCurrentPagePosition,
    questionLimit,
    storyActivityAnswer,
    showBtnSendActivity = true,
  }) => {
    const onPressChevron = (position: "left" | "right") => () =>
      setCurrentPagePosition((past) =>
        position === "left" ? past - 1 : past + 1
      );
    const { setHasFinishedActivity, activityAnswers, ...rest } =
      useActivityPlayContext();
    const hasAnsweredAllQuestions =
      storyActivityAnswer.length === questionLimit;
    return (
      <BaseContainer
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,

          padding: 4,
        }}
        width="150px"
        flexDirection="column"
      >
        <BaseContainer
          style={{ borderRadius: 10 }}
          flex={1}
          height="50px"
          width="100%"
          flexDirection="row"
          backgroundColor="#dbdbdb"
          justify="space-evenly"
          align="center"
        >
          <Pressable
            onPress={
              questionPosition === 1 ? undefined : onPressChevron("left")
            }
          >
            <Entypo name="chevron-left" size={45} color="#afafaf" />
          </Pressable>
          <BaseText align="center" color="#757575" fontSize="25px">
            {questionPosition}
          </BaseText>
          <Pressable
            onPress={
              questionLimit === questionPosition
                ? undefined
                : onPressChevron("right")
            }
          >
            <Entypo name="chevron-right" size={45} color="#afafaf" />
          </Pressable>
        </BaseContainer>
        {showBtnSendActivity &&
          (questionLimit === questionPosition || hasAnsweredAllQuestions) && (
            <LinearGradientButtonContainer
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={["#0093E9", "#80D0C7"]}
            >
              <ButtonActivity
                onPress={() => {
                  if (hasAnsweredAllQuestions) {
                    console.log("PASSEI", rest);
                    activityAnswers.current = [
                      { activity: storyActivityAnswer },
                    ];
                    setHasFinishedActivity(true);
                  }
                }}
              >
                <AntDesign name="form" size={24} color="#fff" />
                <BaseText marginLeft="5px" align="center">
                  {hasAnsweredAllQuestions ? "Enviar" : "Responda"}
                </BaseText>
              </ButtonActivity>
            </LinearGradientButtonContainer>
          )}
      </BaseContainer>
    );
  }
);

export default QuestionsController;

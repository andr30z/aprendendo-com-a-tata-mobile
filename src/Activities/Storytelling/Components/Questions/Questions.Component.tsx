import { FontAwesome } from "@expo/vector-icons";
import React, { useCallback, useState } from "react";
import { Pressable } from "react-native";
import PagerView from "react-native-pager-view";
import { useActivityPlayContext } from "../../../../Contexts";
import { BaseText } from "../../../../GlobalStyles/BaseStyles";
import {
  BaseContainer,
  ScrollContainer,
} from "../../../../GlobalStyles/Containers.Style";
import { SetStateInterface } from "../../../../Interfaces/index";
import { usePageViewerLogic } from "../../../Hooks";
import {
  QuestionOptionItem,
  StoryActivityAnswer,
  StoryQuestionsItem,
} from "../../../Interfaces";
import QuestionOption from "../QuestionOption/QuestionOption.Component";
import QuestionsController from "../QuestionsController/QuestionsController.Component";
import { CloseIconContainer } from "./Styles";

interface QuestionsProps {
  questions: Array<StoryQuestionsItem>;
  setStoryActivityAnswer: SetStateInterface<StoryActivityAnswer>;
  storyActivityAnswer: StoryActivityAnswer;
  onCloseAction: () => void;
}
/**
 *
 * @author andr3z0
 **/
const Questions: React.FC<QuestionsProps> = ({
  questions,
  setStoryActivityAnswer,
  storyActivityAnswer,
  onCloseAction,
}) => {
  const {
    setCurrentPosition,
    currentPageControllerPosition,
    onPageChange,
    pageViewRef,
  } = usePageViewerLogic();
  const [isScrolling, setIsScrolling] = useState(false);
  const { isActivityResultView } = useActivityPlayContext();
  const onClickAnswer = useCallback(
    (option: QuestionOptionItem, questionId: string) => {
      if (isActivityResultView) return;
      setStoryActivityAnswer((past) => {
        const list = [...past];
        const itemPosition = list.findIndex(
          (item) => item.answerId === option._id
        );
        const filtered = list.filter((item) => item.questionId !== questionId);
        if (itemPosition === -1)
          return [...filtered, { answerId: option._id, questionId }];

        return filtered;
      });
    },
    [isActivityResultView]
  );

  return (
    <BaseContainer
      style={{ position: "relative" }}
      flex={1}
      flexDirection="column"
    >
      <CloseIconContainer isScrolling={isScrolling}>
        <Pressable onPress={onCloseAction}>
          <FontAwesome name="close" size={40} color="red" />
        </Pressable>
      </CloseIconContainer>
      <PagerView
        pageMargin={10}
        orientation={"horizontal"}
        scrollEnabled
        onPageSelected={onPageChange}
        ref={pageViewRef}
        style={{ flex: 1 }}
        initialPage={0}
      >
        {questions.map((q, index) => (
          <ScrollContainer
            contentContainerStyle={{
              paddingHorizontal: 30,
              paddingTop: 30,
              paddingBottom: 200,
            }}
            key={q._id}
            onScrollBeginDrag={() => setIsScrolling(true)}
            onScrollEndDrag={() => setIsScrolling(false)}
            collapsable={false}
          >
            <BaseContainer>
              <BaseText fontSize="20px" marginVertical="16px">
                Questão {index + 1} - {q.question}
              </BaseText>
            </BaseContainer>
            <BaseContainer flexDirection="column">
              {q.options.map((option) => (
                <QuestionOption
                  key={option._id}
                  option={option}
                  questionId={q._id}
                  storyActivityAnswer={storyActivityAnswer}
                  onValueChange={onClickAnswer}
                />
              ))}
            </BaseContainer>
          </ScrollContainer>
        ))}
      </PagerView>
      <QuestionsController
        storyActivityAnswer={storyActivityAnswer}
        questionPosition={currentPageControllerPosition + 1}
        setCurrentPagePosition={setCurrentPosition}
        questionLimit={questions.length}
        showBtnSendActivity={!isActivityResultView}
      />
    </BaseContainer>
  );
};

export default Questions;

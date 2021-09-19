import React, { useCallback, useRef, useState } from "react";
import PagerView from "react-native-pager-view";
import { BaseText } from "../../../../GlobalStyles/BaseStyles";
import {
  BaseContainer,
  ScrollContainer,
} from "../../../../GlobalStyles/Containers.Style";
import { SetStateInterface } from "../../../../Interfaces/index";
import {
  QuestionOptionItem,
  StoryActivityAnswer,
  StoryQuestionsItem,
} from "../../../Interfaces";
import QuestionOption from "../QuestionOption/QuestionOption.Component";
import { CloseIconContainer } from "./Styles";

interface QuestionsProps {
  questions: Array<StoryQuestionsItem>;
  setStoryActivityAnswer: SetStateInterface<StoryActivityAnswer>;
  storyActivityAnswer: StoryActivityAnswer;
  onCloseAction: () => void;
}
import { FontAwesome } from "@expo/vector-icons";
import { Pressable } from "react-native";
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
  const [isScrolling, setIsScrolling] = useState(false);
  const pageViewRef = useRef<PagerView>(null);
  const onClickAnswer = useCallback(
    (option: QuestionOptionItem, questionId: string) => {
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
    []
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
        ref={pageViewRef}
        style={{ flex: 1 }}
        initialPage={0}
      >
        {questions.map((q, index) => (
          <ScrollContainer
            contentContainerStyle={{ paddingHorizontal: 30, paddingTop: 30 }}
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
    </BaseContainer>
  );
};

export default Questions;

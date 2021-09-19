import CheckBox from "@react-native-community/checkbox";
import React, { useMemo } from "react";
import { BaseText } from "../../../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../../../GlobalStyles/Containers.Style";
import { QuestionOptionItem, StoryActivityAnswer } from "../../../Interfaces";
import { AnswerText } from "./Styles";

interface QuestionsOptionsProps {
  option: QuestionOptionItem;
  storyActivityAnswer: StoryActivityAnswer;
  questionId: string;
  onValueChange: (option: QuestionOptionItem, questionId: string) => void;
}

/**
 *
 * @author andr3z0
 **/
const QuestionOption: React.FC<QuestionsOptionsProps> = ({
  option,
  questionId,
  storyActivityAnswer,
  onValueChange,
}) => {
  const isSelected = useMemo(
    () =>
      storyActivityAnswer.find(
        (x) => x.answerId === option._id 
      ) !== undefined,
    [storyActivityAnswer, questionId, option]
  );
  return (
    
    <BaseContainer marginBottom="15px" flexDirection="row" key={option._id}>
      <CheckBox
        onValueChange={() => onValueChange(option, questionId)}
        value={isSelected}
      />
      <AnswerText>{option.answer}</AnswerText>
    </BaseContainer>
  );
};

export default QuestionOption;

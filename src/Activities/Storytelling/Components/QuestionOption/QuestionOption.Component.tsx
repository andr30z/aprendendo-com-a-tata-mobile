import React, { useMemo } from "react";
import { BaseText } from "../../../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../../../GlobalStyles/Containers.Style";
import { QuestionOptionItem, StoryActivityAnswer } from "../../../Interfaces";
import { AnswerText } from "./Styles";
import { Checkbox } from "react-native-ui-lib";
import { useActivityPlayContext } from "../../../../Contexts";
import { CorrectItemMark, WrongItemMark } from "../../../../Components";

interface QuestionsOptionsProps {
  option: QuestionOptionItem;
  storyActivityAnswer: StoryActivityAnswer;
  questionId: string;
  onValueChange: (option: QuestionOptionItem, questionId: string) => void;
}

/**
 *
 * @author andr30z
 **/
const QuestionOption: React.FC<QuestionsOptionsProps> = ({
  option,
  questionId,
  storyActivityAnswer,
  onValueChange,
}) => {
  const isSelected = useMemo(
    () =>
      storyActivityAnswer.find((x) => x.answerId === option._id) !== undefined,
    [storyActivityAnswer, questionId, option]
  );
  const { isCorrect } = option;
  const { isActivityResultView } = useActivityPlayContext();
  return (
    <BaseContainer
      // position={isActivityResultView ? "relative" : undefined}
      marginBottom="15px"
      flexDirection="row"
      key={option._id}
    >
      {isActivityResultView && isSelected ? (
        <>
          {!isCorrect ? (
            <WrongItemMark
              size={25}
              position={{
                top: 0,
                left: -26,
              }}
            />
          ) : (
            <CorrectItemMark
              size={25}
              position={{
                top: 0,
                left: -26,
              }}
            />
          )}
        </>
      ) : null}
      <Checkbox
        color="green"
        onValueChange={() => onValueChange(option, questionId)}
        value={isSelected}
      />
      <AnswerText>{option.answer}</AnswerText>
    </BaseContainer>
  );
};

export default QuestionOption;

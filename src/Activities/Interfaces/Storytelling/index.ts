import { ActivityCommonProps } from "../../../Interfaces/ActivityUtilsInterfaces";

type ActivityCommonPropsNoStage = Omit<ActivityCommonProps<any>, "stages">;

export interface StoryItem {
  title?: any;
  paragraphs: Array<{
    title?: string;
    imagePosition?: "left" | "right" | "bottom" | "top";
    image?: any;
    text: string;
  }>;
}

export interface StoryActivityAnswerItem {
  questionId: string;
  answerId: string;
}
export interface StoryActivityAnswer extends Array<StoryActivityAnswerItem> {}
export interface QuestionOptionItem {
  answer: string;
  _id: string;
  isCorrect: boolean;
}

export interface StoryQuestionsItem {
  _id: string;
  question: string;
  options: Array<QuestionOptionItem>;
}

export interface StorytellingActivity {
  title: string;
  storyPages: Array<StoryItem>;
  questions: Array<StoryQuestionsItem>;
}

export interface StorytellingInterface extends ActivityCommonPropsNoStage {
  story: StorytellingActivity;
}

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ActivityCommonProps,
  KeyOfNavigationList,
  Post,
  PostActivityResult,
  ActivityResult
} from "../../Interfaces/index";
type ActivityPlayParamsType = {
  activity: ActivityCommonProps<unknown>;
  activityResult?: ActivityResult;
};
type ActivityDetailsParamsType = {
  activityId: string;
  postId?: string;
  postActivityResult?: PostActivityResult;
};
export interface ClassParamType {
  classId: string;
  postActivityResult?: PostActivityResult;
}

export interface PostDetailsParamsType {
  post: Post;
  primaryTheme: string;
  textTheme: string;
}

export type MainStackParamList = {
  DETAILS: ActivityDetailsParamsType;
  ACTIVITY_PLAY: ActivityPlayParamsType;
  MAIN_BOTTOM: undefined;
  CLASSROOM_DETAILS: ClassParamType;
  POST_DETAILS: PostDetailsParamsType;
};

export type KeysOfActivitiesStackParamList =
  KeyOfNavigationList<MainStackParamList>;

export type Props = NativeStackScreenProps<MainStackParamList, "DETAILS">;

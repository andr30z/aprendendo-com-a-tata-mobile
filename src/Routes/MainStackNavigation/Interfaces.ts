import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ActivityCommonProps,
  KeyOfNavigationList,
  Post,
  PostActivityResult,
  ActivityResult,
} from "../../Interfaces/index";
import { ClassRoomInterface, UserInterface } from "../../Interfaces/index";
import { ROUTES_NAME } from "../SettingsDrawer/RoutesName";

export type ActivityPostParams = { routeIndexToReturnOnFinish?: number };
export interface ActivityPlayParamsType extends ActivityPostParams {
  activity: ActivityCommonProps<unknown>;
  activityResult?: ActivityResult;
  isActivityResultView?: boolean;
}

interface ActivityDetailsParamsType extends ActivityPostParams {
  activityId: string;
  postId?: string;
  postActivityResult?: PostActivityResult;
}
export interface ClassParamType {
  classId: string;
  postActivityResult?: PostActivityResult;
}

export interface PostDetailsParamsType extends ActivityPostParams {
  post: Post;
  primaryTheme: string;
  textTheme: string;
  classroom: ClassRoomInterface;
}

interface TeacherActivityResultListingParams {
  members: Array<UserInterface>;
  postActivityResult: Array<PostActivityResult>;
  primaryTheme: string;
  textTheme: string;
}

export type MainStackParamList = {
  DETAILS: ActivityDetailsParamsType;
  ACTIVITY_PLAY: ActivityPlayParamsType;
  MAIN_BOTTOM: undefined;
  SETTINGS_DRAWER: {
    screen: ROUTES_NAME;
  };
  CLASSROOM_DETAILS: ClassParamType;
  POST_DETAILS: PostDetailsParamsType;
  TEACHER_ACTIVITY_RESULT_LISTING: TeacherActivityResultListingParams;
};

export type KeysOfActivitiesStackParamList =
  KeyOfNavigationList<MainStackParamList>;

export type Props = NativeStackScreenProps<MainStackParamList, "DETAILS">;

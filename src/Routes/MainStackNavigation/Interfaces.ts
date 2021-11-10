import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ActivityCommonProps,
  KeyOfNavigationList,
} from "../../Interfaces/index";
type ParamsType = { activity: ActivityCommonProps<unknown> };

export interface ClassParamType {
  classId: string;
}

export type MainStackParamList = {
  DETAILS: ParamsType;
  ACTIVITY_PLAY: ParamsType;
  MAIN_BOTTOM: undefined;
  CLASSROOM_DETAILS: ClassParamType;
};

export type KeysOfActivitiesStackParamList =
  KeyOfNavigationList<MainStackParamList>;

export type Props = NativeStackScreenProps<MainStackParamList, "DETAILS">;

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityCommonProps, KeyOfNavigationList } from "../../Interfaces/index";
type ParamsType = { activity: ActivityCommonProps<unknown> };



export type MainStackParamList = {
  DETAILS: ParamsType;
  ACTIVITY_PLAY: ParamsType;
  MAIN_BOTTOM: undefined;
  CLASSROOM_DETAILS: undefined;
};

export type KeysOfActivitiesStackParamList = KeyOfNavigationList<MainStackParamList>;

export type Props = NativeStackScreenProps<MainStackParamList, "DETAILS">;

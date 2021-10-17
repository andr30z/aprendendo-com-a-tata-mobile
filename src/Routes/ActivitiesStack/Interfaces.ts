import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityCommonProps, KeyOfNavigationList } from "../../Interfaces/index";
type ParamsType = { activity: ActivityCommonProps<unknown> };


export type ActivitiesStackParamList = {
  DETAILS: ParamsType;
  ACTIVITY_PLAY: ParamsType;
  MAIN_BOTTOM: undefined;
};

export type KeysOfActivitiesStackParamList = KeyOfNavigationList<ActivitiesStackParamList>;

export type Props = NativeStackScreenProps<ActivitiesStackParamList, "DETAILS">;

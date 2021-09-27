import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityCommonProps } from "../../Interfaces/index";
type ParamsType = { activity: ActivityCommonProps<unknown> };
export type StackParamList = {
  Details: ParamsType;
  ActivityPlay: ParamsType;
};

export type Props = NativeStackScreenProps<StackParamList, "Details">;


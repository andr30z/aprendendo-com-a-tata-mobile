import { RoutesListType } from "../../Interfaces/index";
import { KeysOfActivitiesStackParamList } from "./Interfaces";

interface ActivitiesRoutesInterface {
  DETAILS: KeysOfActivitiesStackParamList;
  MAIN_BOTTOM: KeysOfActivitiesStackParamList;
  ACTIVITY_PLAY: KeysOfActivitiesStackParamList;
}
export const ROUTES_NAME: ActivitiesRoutesInterface = {
  DETAILS: "DETAILS",
  MAIN_BOTTOM: "MAIN_BOTTOM",
  ACTIVITY_PLAY: "ACTIVITY_PLAY",
};

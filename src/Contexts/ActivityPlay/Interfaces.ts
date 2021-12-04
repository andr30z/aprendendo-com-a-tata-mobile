import { ActivityCommonProps, ActivityResult } from "../../Interfaces";
import { ActivityPostParams } from "../../Routes/MainStackNavigation/Interfaces";

export interface ActivityPlayProviderProps extends ActivityPostParams {
  activityResult?: ActivityResult;
  activity: ActivityCommonProps<unknown>;
  isActivityResultView?: boolean;
}

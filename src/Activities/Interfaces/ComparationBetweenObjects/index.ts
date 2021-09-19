import { ActivityCommonProps } from "../../../Interfaces/ActivityUtilsInterfaces";

export interface ComparationBetweenObjectsActivityItem {
  image?: any;
  imageText?: string;
  receiver: boolean;
  comparationBondValue: string;
  borderColorOnSuccessDrag: string;
  _id: string;
}

type ActivityComparationType = Omit<
  ActivityCommonProps<Array<ComparationBetweenObjectsActivityItem>>,
  "type"
>;
export interface ComparationBetweenObjectsActivity {
  activity: ActivityComparationType;
}

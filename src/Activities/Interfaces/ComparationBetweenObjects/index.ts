export interface ComparationBetweenObjectsActivityItem {
  image?: any;
  imageText?: string;
  receiver: boolean;
  id: string;
  comparationBondValue: string;
  borderColorOnSuccessDrag: string;
}
export interface ComparationBetweenObjectsActivity {
  activityUtterance: string;
  comparationStages: Array<Array<ComparationBetweenObjectsActivityItem>>;
}

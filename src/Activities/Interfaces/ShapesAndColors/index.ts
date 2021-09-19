import { ActivityCommonProps } from "../../../Interfaces/ActivityUtilsInterfaces";
export interface ShapesAndColorsActivityStageItem {
  _id: string;
  isHeadImage: boolean;
  imageAfterColoring?: any;
  initialImage: any;
  isItemReceiver: boolean;
}
export interface ShapesAndColorsActivityStage {
  columns: Array<Array<ShapesAndColorsActivityStageItem>>;
}
export interface ShapesAndColorsInterface
  extends ActivityCommonProps<ShapesAndColorsActivityStage> {}

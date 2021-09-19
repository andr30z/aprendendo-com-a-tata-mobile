import { ActivityCommonProps } from "../../../../Interfaces/ActivityUtilsInterfaces";

export interface NumberSequenceActivityStage {
  sequence: Array<number | string>;
  //   completeSequence: Array<number>;
  boxColors?: string;
}
export interface NumberSequenceActivityStageInterface
  extends ActivityCommonProps<NumberSequenceActivityStage> {}

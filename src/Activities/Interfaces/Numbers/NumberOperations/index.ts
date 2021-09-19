import { ActivityCommonProps } from "../../../../Interfaces/ActivityUtilsInterfaces";
export interface InputItem {
  image?: any;
  numberValue?: string;
  operation?: "+" | "-" | "x" | "/";
  _id: string;
}

export interface OperationResultItem {
  operationId: string;
  result?: number;
}

export interface OperationResult extends Array<OperationResultItem> {}
export interface OperationItem {
  result: number;
  inputs: Array<InputItem>;
  _id: string;
}

export interface NumberOperationsActivityStage {
  operations: Array<OperationItem>;
  _id: string;
  //   completeSequence: Array<number>;
}
export interface NumberOperationsActivityStageInterface
  extends ActivityCommonProps<NumberOperationsActivityStage> {}

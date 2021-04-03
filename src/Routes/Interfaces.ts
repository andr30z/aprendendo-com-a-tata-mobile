import { LabelPosition } from "@react-navigation/bottom-tabs/lib/typescript/src/types";

export interface IconProps {
  focused: boolean;
  color: string;
  size: number;
}

export interface LabelProps {
  focused: boolean;
  color: string;
  position: LabelPosition;
}

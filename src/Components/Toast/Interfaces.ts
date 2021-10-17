import { ViewStyle } from "react-native";
import { SetStateInterface } from "../../Interfaces/index";

export interface ToastProps {
  show: boolean;
  setShow: SetStateInterface<boolean>;
  backgroundColor?: string;
  customStyles?: ViewStyle;
  closeProgressBarBackgroundColor?: string;
  showCloseAction?: boolean;
}

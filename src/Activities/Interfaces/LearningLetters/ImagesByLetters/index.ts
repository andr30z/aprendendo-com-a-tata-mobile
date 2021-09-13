import {
  Dispatch,
  SetStateAction,
} from "hoist-non-react-statics/node_modules/@types/react";
import { ActivityCommonProps } from "../../../../Interfaces/ActivityUtilsInterfaces";
export interface ImageItemInterface {
  image: any;
  imageStartWithInitialLetter: boolean;
  _id: string;
}
export interface LettersActivityInterface {
  initialLetter: string;
  _id: string;
  images: Array<ImageItemInterface>;
}
export interface ImagesByLettersActivityStage {
  pressingLettersActivity: Array<LettersActivityInterface>;
}
export interface ImagesByLettersActivityStageInterface
  extends ActivityCommonProps<ImagesByLettersActivityStage> {}

export interface PressedItemsInterface {
  imagesContainerId: string;
  pressed: Array<string>;
}

export interface PressedImagesInterface extends Array<PressedItemsInterface> {}

export interface CommonImageItemProps {
  setPressedImagesId: Dispatch<SetStateAction<PressedImagesInterface>>;
  index: number;
  pressedItems: PressedImagesInterface;
}

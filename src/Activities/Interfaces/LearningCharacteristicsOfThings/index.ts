import { ActivityCommonProps } from "../../../Interfaces/index";

export interface CharacteristicItem {
  image: any;
  imageIsCharacteristic: boolean;
  _id: string;
}

interface CharacteristicsItems extends Array<CharacteristicItem> {}

export interface LearningCharacteristicsOfThingsActivityStage {
  characteristicsItems: CharacteristicsItems;
  _id: string;
}
export interface LearningCharacteristicsOfThingsActivityStageInterface
  extends ActivityCommonProps<LearningCharacteristicsOfThingsActivityStage> {}

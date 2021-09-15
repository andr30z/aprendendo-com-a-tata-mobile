import React, { Dispatch, SetStateAction, useMemo } from "react";
import { Pressable, useWindowDimensions } from "react-native";
import { BaseContainer } from "../../../../GlobalStyles/Containers.Style";
import { CharacteristicItem } from "../../../Interfaces";

interface LearningCharacteristicsOfThingsItemProps {
  characteristicItem: CharacteristicItem;
  setPressedImages: Dispatch<SetStateAction<Array<string>>>;
  pressedImages: Array<string>;
  index: number;
}

/**
 *
 * @author andr3z0
 **/
const LearningCharacteristicsOfThingsItem: React.FC<LearningCharacteristicsOfThingsItemProps> =
  ({ characteristicItem, setPressedImages, pressedImages }) => {
    const Image = characteristicItem.image;
    const findCurrentItemInPressedImages = (arr: Array<string>) =>
      arr.findIndex((x) => x === characteristicItem._id);
    const onPress = () => {
      if (!characteristicItem.imageIsCharacteristic)
        return console.log("não sou caracteristico");
      setPressedImages((past) => {
        const list = [...past];
        if (findCurrentItemInPressedImages(list) !== -1) return past;
        list.push(characteristicItem._id);
        return list;
      });
    };
    const isPressed = useMemo(
      () => findCurrentItemInPressedImages(pressedImages) !== -1,
      [pressedImages, characteristicItem]
    );
    const { width } = useWindowDimensions();
    return (
      <Pressable onPress={onPress}>
        <BaseContainer
          marginVertical="10px"
          paddingHorizontal="3px"
          style={{
            borderWidth: 1,
            borderColor: isPressed ? "#000" : "transparent",
            borderRadius: 30,
          }}
          marginHorizontal="10px"
        >
          <Image height="100" width={width * 0.25} />
        </BaseContainer>
      </Pressable>
    );
  };

export default LearningCharacteristicsOfThingsItem;

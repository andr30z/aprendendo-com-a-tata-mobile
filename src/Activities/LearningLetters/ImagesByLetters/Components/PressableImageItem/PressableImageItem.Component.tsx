import React, { useMemo } from "react";
import { Pressable } from "react-native";
import {
  CommonImageItemProps,
  ImageItemInterface,
} from "../../../../Interfaces";

interface PressableImageItemProps extends CommonImageItemProps {
  imageItem: ImageItemInterface;
}

/**
 *
 * @author andr3z0
 **/
const PressableImageItem: React.FC<PressableImageItemProps> = ({
  index,
  pressedItems,
  imageItem,
  setPressedImagesId,
}) => {
  const Image = imageItem.image;
  const onPressValue = () => {
    if (!imageItem.imageStartWithInitialLetter) return;
    setPressedImagesId((past) => {
      const list = [...past];
      const currentList = list[index].pressed;
      if (!currentList.find((x) => x === imageItem._id)) {
        currentList.push(imageItem._id);
        return list;
      }

      return past;
    });
  };
  const isImagePressed = useMemo(() => {
    return (
      pressedItems[index]?.pressed?.find((id) => id === imageItem._id) !==
      undefined
    );
  }, [index, pressedItems]);
  return (
    <Pressable
      style={[
        isImagePressed && {
          borderColor: "black",
          borderWidth: 2,
          borderStyle: "solid",
          borderRadius: 50,
        },
        {
          marginHorizontal: 10,
          padding: 4,
        },
      ]}
      key={imageItem._id}
      onPress={onPressValue}
    >
      <Image height="100" width="100" />
    </Pressable>
  );
};

export default PressableImageItem;

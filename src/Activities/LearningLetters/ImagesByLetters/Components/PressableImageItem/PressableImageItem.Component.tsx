import React, { useMemo } from "react";
import { Pressable, Image } from "react-native";
import { useActivityPlayContext } from "../../../../../Contexts";
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
  const { isActivityResultView } = useActivityPlayContext();
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
      onPress={isActivityResultView ? undefined : onPressValue}
    >
      <Image
        resizeMode="center"
        style={{ height: 80, width: 80 }}
        source={{ uri: imageItem.image }}
      />
    </Pressable>
  );
};

export default PressableImageItem;

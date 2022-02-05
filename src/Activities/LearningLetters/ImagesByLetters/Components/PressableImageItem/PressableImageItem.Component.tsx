import React, { useMemo } from "react";
import { Pressable, Image } from "react-native";
import { CorrectItemMark, WrongItemMark } from "../../../../../Components";
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
 * @author andr30z
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
          position: isActivityResultView ? "relative" : undefined,
        },
      ]}
      key={imageItem._id}
      onPress={isActivityResultView ? undefined : onPressValue}
    >
      {isActivityResultView && imageItem.imageStartWithInitialLetter ? (
        <>
          {!isImagePressed ? (
            <WrongItemMark
              size={25}
              position={{
                top: 0,
                left: 10,
              }}
            />
          ) : (
            <CorrectItemMark
              size={25}
              position={{
                top: 0,
                left:10,
              }}
            />
          )}
        </>
      ) : null}
      <Image
        resizeMode="center"
        style={{ height: 80, width: 80 }}
        source={{ uri: imageItem.image }}
      />
    </Pressable>
  );
};

export default PressableImageItem;

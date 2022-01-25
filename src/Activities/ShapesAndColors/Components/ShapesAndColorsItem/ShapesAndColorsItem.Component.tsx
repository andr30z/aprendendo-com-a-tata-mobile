import React, { useMemo } from "react";
import { View, Image } from "react-native";
import { DraxView } from "react-native-drax";
import { CorrectItemMark, WrongItemMark } from "../../../../Components";
import { useActivityPlayContext } from "../../../../Contexts";
import {
  ShapesAndColorsActivityStageItem,
  TaggedItems,
} from "../../../Interfaces";

interface ShapesAndColorsItemProps {
  item: ShapesAndColorsActivityStageItem;
  taggedItems: TaggedItems;
  setTaggedItems: React.Dispatch<React.SetStateAction<TaggedItems>>;
  columnIndex: number;
  itemIndex: number;
}

/**
 *
 * @author andr30z
 **/
const ShapesAndColorsItem: React.FC<ShapesAndColorsItemProps> = ({
  item: { imageAfterColoring, initialImage, isHeadImage, _id, isItemReceiver },
  taggedItems,
  setTaggedItems,
  columnIndex,
  itemIndex,
}) => {
  const taggedItem = useMemo(
    () => taggedItems.find((item) => item.receiverId === _id),
    [taggedItems]
  );
  const { isActivityResultView } = useActivityPlayContext();
  const image = taggedItem ? imageAfterColoring : initialImage;
  return (
    <>
      <DraxView
        draggable={isHeadImage && !isActivityResultView}
        onReceiveDragDrop={({ dragged }) => {
          if (
            dragged.payload.columnIndex !== columnIndex ||
            taggedItem ||
            !isItemReceiver
          )
            return;
          setTaggedItems((past) => {
            const list = [...past];
            list.push({ columnHeadId: dragged.payload._id, receiverId: _id });
            return list;
          });
        }}
        payload={{ _id, columnIndex }}
        receptive={!isHeadImage}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
            position: isActivityResultView ? "relative" : undefined,
          }}
        >
          {isActivityResultView && !isHeadImage && imageAfterColoring ? (
            <>
              {taggedItem ? (
                <CorrectItemMark center size={60} />
              ) : (
                <WrongItemMark center size={60} />
              )}
            </>
          ) : null}
          <Image
            resizeMode="center"
            style={{ height: 80, width: "95%" }}
            source={{ uri: image }}
          />
        </View>
      </DraxView>
      {itemIndex === 0 && (
        <View
          style={{
            borderColor: "#000",
            borderStyle: "solid",
            borderBottomWidth: 1,
          }}
        />
      )}
    </>
  );
};

export default ShapesAndColorsItem;

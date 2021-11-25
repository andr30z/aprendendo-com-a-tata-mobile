import { ShapesAndColorsActivityStageItem, TaggedItems } from "../Interfaces";

export function getAllCorrectTaggedItems(
  taggedItems: TaggedItems,
  column: ShapesAndColorsActivityStageItem[][]
) {
  let possibleTaggedItemsLength = 0;
  column.forEach((x) => {
    possibleTaggedItemsLength += x.filter((y) => y.isItemReceiver).length;
  });
  return possibleTaggedItemsLength === taggedItems.length;
}

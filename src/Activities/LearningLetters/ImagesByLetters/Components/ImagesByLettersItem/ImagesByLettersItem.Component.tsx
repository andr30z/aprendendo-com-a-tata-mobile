import React from "react";
import { BaseText } from "../../../../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../../../../GlobalStyles/Containers.Style";
import {
  CommonImageItemProps,
  LettersActivityInterface,
} from "../../../../Interfaces";
import PressableImageItem from "../PressableImageItem/PressableImageItem.Component";

interface ImagesByLettersItemProps extends CommonImageItemProps {
  letterItem: LettersActivityInterface;
}

/**
 *
 * @author andr30z
 **/
const ImagesByLettersItem = React.memo<ImagesByLettersItemProps>(
  ({ letterItem, setPressedImagesId, index, pressedItems }) => (
    <BaseContainer
      marginVertical="15px"
      flex={1}
      flexDirection="row"
      paddingHorizontal="3%"
    >
      <BaseContainer flex={1} align="center" justify="center">
        <BaseText fontSize="35px" color="black">
          {letterItem.initialLetter}
        </BaseText>
      </BaseContainer>
      <BaseContainer
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          borderRadius: 20,
          elevation: 2,
        }}
        flex={4}
        paddingVertical="3%"
        // backgroundColor="#fff"
        align="center"
        justify="center"
        flexDirection="row"
        flexWrap="wrap"
      >
        {letterItem.images.map((item) => (
          <PressableImageItem
            key={item._id}
            setPressedImagesId={setPressedImagesId}
            imageItem={item}
            index={index}
            pressedItems={pressedItems}
          />
        ))}
      </BaseContainer>
    </BaseContainer>
  )
);
export default ImagesByLettersItem;

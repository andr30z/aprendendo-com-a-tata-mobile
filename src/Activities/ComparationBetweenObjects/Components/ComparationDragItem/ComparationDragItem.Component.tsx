import React, { Dispatch, SetStateAction, useMemo, useRef } from "react";
import { View, Image } from "react-native";
import { DraxView } from "react-native-drax";
import { BaseText } from "../../../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../../../GlobalStyles/Containers.Style";
import { ComparationBetweenObjectsActivityItem } from "../../../Interfaces";
import { ArrayBonds } from "../../Interfaces";

interface ComparationDragItemProps {
  comparation: ComparationBetweenObjectsActivityItem;
  setCurrentStageBonds: Dispatch<SetStateAction<ArrayBonds>>;
  currentStageBonds: ArrayBonds;
}

const ComparationDragItem: React.FC<ComparationDragItemProps> = ({
  comparation,
  setCurrentStageBonds,
  currentStageBonds,
}) => {
  const bond = useMemo(
    () =>
      currentStageBonds.find(
        (item) =>
          item.senderId === comparation._id ||
          item.receiverId === comparation._id
      ),
    [currentStageBonds]
  );

  return (
    <DraxView
      draggable={comparation.receiver === false && bond === undefined}
      onReceiveDragDrop={({ dragged }) => {
        // console.log(comparation.comparationBondValue, dragged);
        if (!comparation.receiver) return;
        console.log(comparation.comparationBondValue, dragged.payload);
        const bondValue = comparation.comparationBondValue;
        if (comparation.comparationBondValue === dragged.payload)
          setCurrentStageBonds((past) => [
            ...past,
            { senderId: bondValue, receiverId: comparation._id },
          ]);
      }}
      payload={comparation.receiver ? undefined : comparation._id}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "33%",
        }}
      >
        <BaseContainer
          style={
            bond && {
              borderStyle: "solid",
              borderColor: comparation.borderColorOnSuccessDrag,
              borderWidth: 3,
              borderRadius: 40,
              padding: 7,
            }
          }
        >
          {comparation.image && (
            <Image
              resizeMode="contain"
              style={{ height: 80, width: 80 }}
              source={{ uri: comparation.image }}
            />
          )}
          {comparation.imageText && (
            <BaseText fontSize="20px" color="black">
              {comparation.imageText}
            </BaseText>
          )}
        </BaseContainer>
      </View>
    </DraxView>
  );
};

export default ComparationDragItem;

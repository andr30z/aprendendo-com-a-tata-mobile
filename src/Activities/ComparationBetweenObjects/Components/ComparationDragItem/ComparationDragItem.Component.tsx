import React, { Dispatch, SetStateAction, useMemo, useRef } from "react";
import { View } from "react-native";
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
  const Image = comparation.image;

  const bond = useMemo(
    () =>
      currentStageBonds.find(
        (item) =>
          item.senderId === comparation._id ||
          item.receiverId === comparation._id
      ),
    [currentStageBonds]
  );
  // useEffect(() => {
  //   viewRef.current?.measure((x, y) => {
  //     console.log(x, y);
  //     refContainer.current[comparation._id] = { x, y };
  //   });
  // },[]);
  return (
    <DraxView
      draggable={comparation.receiver === false && bond === undefined}
      onDragStart={() => {
        console.log("start drag");
      }}
      onReceiveDragDrop={({ dragged }) => {
        // console.log(comparation.comparationBondValue, dragged);
        if (!comparation.receiver) return;
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

          // height: comparation.image ? 80 : 20,
          // w_idth: comparation.image ? 80 : 20,
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
          {Image && <Image height="80" width="80" />}
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

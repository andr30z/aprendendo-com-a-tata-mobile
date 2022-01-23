import React, { Dispatch, SetStateAction, useMemo } from "react";
import { Image, View } from "react-native";
import { DraxView } from "react-native-drax";
import WrongItemMark from "../../../../Components/WrongItemMark/WrongItemMark.Component";
import CorrectItemMark from "../../../../Components/CorrectItemMark/CorrectItemMark.Component";
import { useActivityPlayContext } from "../../../../Contexts";
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

  const { isActivityResultView } = useActivityPlayContext();

  return (
    <DraxView
      draggable={
        comparation.receiver === false &&
        bond === undefined &&
        !isActivityResultView
      }
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
          position: isActivityResultView ? "relative" : undefined,
        }}
      >
        {isActivityResultView && (
          <>
            {!bond ? (
              <WrongItemMark
                color={comparation.borderColorOnSuccessDrag}
                position={{
                  right: comparation.receiver ? undefined : 0,
                  top: undefined,
                  left: comparation.receiver ? 0 : undefined,
                  bottom: "-5%" as any,
                }}
              />
            ) : (
              <CorrectItemMark
                color={comparation.borderColorOnSuccessDrag}
                position={{
                  right: comparation.receiver ? undefined : 0,
                  top: undefined,
                  left: comparation.receiver ? 0 : undefined,
                  bottom: "-5%" as any,
                }}
              />
            )}
          </>
        )}
        <BaseContainer
          style={
            !isActivityResultView &&
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

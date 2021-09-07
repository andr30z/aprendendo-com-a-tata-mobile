import React, { useState } from "react";
import { useWindowDimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { WithDraxProvider } from "../../Components";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { useStageLogic } from "../../Hooks/useStageLogic";
import { ShapesAndColorsInterface, TaggedItems } from "../Interfaces";
import { ShapesAndColorsItem } from "./Components";
import { FlatListContainer } from "./Styles";

interface ShapesAndColorsProps {
  activity: ShapesAndColorsInterface;
}

/**
 *
 * @author andr3z0
 **/
const ShapesAndColors = WithDraxProvider<ShapesAndColorsProps>(
  ({ activity }) => {
    const [taggedItems, setTaggedItems] = useState<TaggedItems>([]);
    const { currentStageIndex } = useStageLogic(
      null,
      () => false,
      () => null
    );
    const currentStage = activity.stages[currentStageIndex];

    const { width } = useWindowDimensions();

    return (
      <BaseContainer flex={1}>
        <BaseContainer flex={0.3} align="center" justify="center">
          <BaseText align="center" color="#000">
            {activity.activityUtterance}
          </BaseText>
        </BaseContainer>
        <BaseContainer
          style={{ paddingHorizontal: "3%", backgroundColor: "#ccc" }}
          flex={2}
          flexDirection="row"
          justify="space-evenly"
        >
          {currentStage.columns.map((column, index) => (
            <FlatListContainer
              style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.3,
                shadowRadius: 4.65,
                elevation: 8,
                //ocupando 30% do espaço da tela
                width: (width / 100) * 25,
              }}
              key={index}
            >
              <FlatList
                data={column}
                keyExtractor={(item) => item._id}
                renderItem={({ item, index: idx }) => {
                  return (
                    <ShapesAndColorsItem
                      item={item}
                      itemIndex={idx}
                      columnIndex={index}
                      taggedItems={taggedItems}
                      setTaggedItems={setTaggedItems}
                    />
                  );
                }}
              />
            </FlatListContainer>
          ))}
        </BaseContainer>
      </BaseContainer>
    );
  }
);

export default ShapesAndColors;

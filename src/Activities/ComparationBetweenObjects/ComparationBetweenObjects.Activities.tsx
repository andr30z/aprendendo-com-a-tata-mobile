import React, { useMemo, useRef, useState, useEffect } from "react";
import { View } from "react-native";
import { DraxProvider } from "react-native-drax";
import Svg, { Line } from "react-native-svg";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import {
  ComparationBetweenObjectsActivityItem,
  ComparationBetweenObjectsActivity,
  DraxViewRefsPositions,
} from "../Interfaces";
import { ComparationDragItem } from "./Components";
import { ArrayBonds } from "./Interfaces";

const filterFunction =
  (receiver: boolean) => (comparation: ComparationBetweenObjectsActivityItem) =>
    comparation.receiver === receiver;

interface ViewPositionsType {
  x: number;
  y: number;
  width: number;
  height: number;
  pageX: number;
  pageY: number;
}
const getViewPositions = (view: View | null): ViewPositionsType | undefined => {
  if (!view) return undefined;
  const positions: ViewPositionsType = {} as ViewPositionsType;
  view.measure((x, y, width, height, pageX, pageY) => {
    positions["x"] = x;
    positions["y"] = y;
    positions["pageX"] = pageX;
    positions["pageY"] = pageY;
    positions["width"] = width;
    positions["height"] = height;
  });
  console.log(positions);
  return positions;
};
/**
 *
 * @author andr3z0
 **/
const ComparationBetweenObjects: React.FC<ComparationBetweenObjectsActivity> =
  ({ activityUtterance, comparationStages }) => {
    const [currentStageIndex, setCurrentStageIndex] = useState(0);
    const currentStage = useMemo(
      () => comparationStages[currentStageIndex],
      [currentStageIndex]
    );
    const comparationItemsView = useRef<DraxViewRefsPositions>({});
    const [currentStageBonds, setCurrentStageBonds] = useState<ArrayBonds>([]);
    const columns = useMemo(() => {
      const leftColumn = currentStage.filter(filterFunction(false));
      const rightColumn = currentStage.filter(filterFunction(true));
      return {
        left: leftColumn,
        right: rightColumn,
      };
    }, [currentStage]);

    useEffect(() => {
      setCurrentStageBonds([]);
      comparationItemsView.current = {};
    }, [currentStage]);

    // useEffect(() => {
    //   console.log(currentStageBonds);
    // }, [currentStageBonds]);

     useEffect(() => {
       if (
         currentStageBonds.length === columns.left.length &&
         currentStageIndex !== comparationStages.length - 1
       )
         setCurrentStageIndex((past) => past + 1);
     }, [currentStageBonds]);

    // useEffect(() => {
    //   console.log(draxViewsArray, 'array');
    // }, [currentStageBonds]);
    return (
      <DraxProvider>
        <BaseContainer flex={1}>
          <BaseContainer justify="center" align="center" flex={0.3}>
            <BaseText color="#000">{activityUtterance}</BaseText>
          </BaseContainer>
          <BaseContainer flex={1} flexDirection="row" justify="center">
            <BaseContainer flexDirection="column" style={{marginRight:5}} justify="space-evenly">
              {columns.left.map((item) => (
                <ComparationDragItem
                  currentStageBonds={currentStageBonds}
                  setCurrentStageBonds={setCurrentStageBonds}
                  key={item.id}
                  comparation={item}
                />
              ))}
            </BaseContainer>
            <BaseContainer flexDirection="column" justify="space-evenly">
              {columns.right.map((item) => (
                <ComparationDragItem
                  currentStageBonds={currentStageBonds}
                  setCurrentStageBonds={setCurrentStageBonds}
                  key={item.id}
                  comparation={item}
                />
              ))}
            </BaseContainer>
          </BaseContainer>
        </BaseContainer>
      </DraxProvider>
    );
  };

export default ComparationBetweenObjects;

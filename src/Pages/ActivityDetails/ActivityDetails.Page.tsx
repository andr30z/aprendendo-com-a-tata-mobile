import React, { useState, useEffect } from "react";
import { DraxProvider, DraxView } from "react-native-drax";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { DraggableText } from "./Styles";

const ActivityDetails = () => {
  const [dragList, setDragList] = useState(["LO", "CA", "VA"]);
  const [finished, setFinished] = useState(false);
  
  useEffect(() => {
    if (dragList.join('') === "CAVALO") setFinished(true);
  }, [dragList]);

  return (
    <DraxProvider>
      <BaseContainer flex={1} backgroundColor="blue">
        <BaseText align="center">
          ALINHE AS SILABAS PARA FORMAR A PALAVRA
        </BaseText>
        <BaseContainer
          flex={1}
          align="center"
          justify="center"
          flexDirection="row"
        >
          {dragList.map((item, index) => (
            <DraxView
              key={item}
              draggable={!finished}
              onDragStart={() => {
                console.log("start drag");
              }}
              onReceiveDragDrop={({ dragged }) => {
                const list = [...dragList];
                const tmp = list[index];
                list[index] = dragged.payload;
                list[dragList.findIndex((item) => item === dragged.payload)] =
                  tmp;
                setDragList(list);
              }}
              renderContent={() => {
                return (
                  <DraggableText
                    backgroundColor="white"
                    viewMarginLeft={index !== 0}
                  >
                    <BaseText color="black" align="center">
                      {item}
                    </BaseText>
                  </DraggableText>
                );
              }}
              payload={item}
            />
          ))}
        </BaseContainer>
      </BaseContainer>
    </DraxProvider>
  );
};

export default ActivityDetails;

import React from "react";
import { useWindowDimensions } from "react-native";
import CloudsContainer from "../../../../Components/CloudsContainer/CloudsContainer.Component";
import { BaseContainer } from "../../../../GlobalStyles/Containers.Style";

const Clouds: React.FC = () => {
  const { width, height } = useWindowDimensions();
  return (
    <BaseContainer
      position="relative"
      flex={1}
      width={`${width}px`}
      height={`${height}px`}
    >
      <CloudsContainer />
    </BaseContainer>
  );
};

export default Clouds;

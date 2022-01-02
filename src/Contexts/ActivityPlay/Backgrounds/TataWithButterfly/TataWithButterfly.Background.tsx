import React, { useMemo } from "react";
import { useWindowDimensions } from "react-native";
import { BaseContainer } from "../../../../GlobalStyles/Containers.Style";
import TataWithButterflyImage from "../../../../Illustrations/tata.svg";
import { getRandomInt } from "../../../../Utils";

const backgroundColor = [
  "#83CAF6",
  "#9188E5",
  "#F48C7F",
  "#3C8F7C",
  "#FF4C4C",
  "#355389",
  "#96c8a2"
];
const TataWithButterfly: React.FC = () => {
  const { width, height } = useWindowDimensions();
  const randomInt = useMemo(() => getRandomInt(0, 6), []);
  return (
    <BaseContainer flex={1} position="relative">
      <TataWithButterflyImage height={height * 0.33} width={width} />
      <BaseContainer
        position="absolute"
        backgroundColor={backgroundColor[randomInt]}
        width="100%"
        height="25%"
        style={{ zIndex: 0, bottom: 0 }}
      />
    </BaseContainer>
  );
};

export default TataWithButterfly;

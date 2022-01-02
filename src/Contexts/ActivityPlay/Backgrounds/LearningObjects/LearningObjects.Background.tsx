import React from "react";
import { useWindowDimensions } from "react-native";
import LearningObjectsImage from "../../../../Illustrations/g12.svg";
const LearningObjects: React.FC = () => {
  const { width, height } = useWindowDimensions();
  return <LearningObjectsImage height={height} width={width} />;
};

export default LearningObjects;

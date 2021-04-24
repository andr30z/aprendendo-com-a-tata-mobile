import React from "react";
import YellowRight from "../../Illustrations/cloud-yellow-right.svg";
import WhiteRight from "../../Illustrations/cloud-white-right.svg";
import WhiteLeft from "../../Illustrations/cloud-white-left.svg";
import YellowLeft from "../../Illustrations/cloud-yellow-left.svg";
import BlueLeft from "../../Illustrations/cloud-blue-left.svg";
import BlueRight from "../../Illustrations/cloud-blue-right.svg";
import RedRight from "../../Illustrations/cloud-red-right.svg";
import RedLeft from "../../Illustrations/cloud-red-left.svg";
import { ViewStyle } from "react-native";

interface CloudProps {
  direction: "left" | "right";
  color: "white" | "yellow" | "blue" | "red";
  cloudHeight: string;
  cloudWidth: string;
  cloudStyle: ViewStyle | Array<ViewStyle>;
}

const CloudObject = {
  left: {
    yellow: YellowLeft,
    white: WhiteLeft,
    blue: BlueLeft,
    red: RedLeft,
  },
  right: {
    yellow: YellowRight,
    white: WhiteRight,
    blue: BlueRight,
    red: RedRight,
  },
};

/**
 * This is a componentization of a svg icon
 * @author andr3z0
 **/
const Cloud: React.FC<CloudProps> = ({
  direction,
  color,
  cloudStyle,
  cloudHeight,
  cloudWidth,
}) => {
  const Component = CloudObject[direction][color];
  return (
    <Component height={cloudHeight} width={cloudWidth} style={cloudStyle} />
  );
};

export default Cloud;

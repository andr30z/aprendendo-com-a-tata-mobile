import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IconProps } from "../../../Interfaces";
import { FontAwesome } from "@expo/vector-icons";
import { useUserContext } from "../../../../Contexts";
import { UserType } from "../../../../Interfaces/index";
/**
 *
 * @author andr3z0
 **/
const CurrentUserActivityVisualization: React.FC<IconProps> = (props) => {
  return (
    <FontAwesome
      name="history"
      size={27}
      color={"#fff"}
    />
  );
};

export default CurrentUserActivityVisualization;

import React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { BaseContainer } from "../../../../GlobalStyles/Containers.Style";
import { IconProps } from "../../../Interfaces";

/**
 * This is the Icon of the Home page, it's going to appear on the Main Navigation.
 *
 * @author andr3z0
 **/
const Home: React.FC<IconProps> = ({ focused }) => {
  return (
    <SimpleLineIcons
      style={{ marginLeft: focused ? 5 : 0 }}
      name="control-play"
      size={focused ? 30 : 25}
      color={"#fff"}
    />
  );
};

export default Home;

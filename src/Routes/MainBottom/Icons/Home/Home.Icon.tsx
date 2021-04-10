import React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { BaseContainer } from "../../../../GlobalStyles/Containers.Style";
import { IconProps } from "../../../Interfaces";

/**
 * This is the Icon of the Home page, it's going to appear on the Main Navigation.
 *
 * @author andr3z0
 **/
const Home: React.FC<IconProps> = (props) => {
  return (
    <BaseContainer
      style={{
        position: "absolute",
        top: -25,
        borderRadius: 60 / 2,
        height: 50,
        width: 50,
      }}
      backgroundColor={props.focused ? "#8078cc" : "#fff"}
      align="center"
      justify="center"
    >
      <SimpleLineIcons
        style={{ marginLeft: 5 }}
        name="control-play"
        size={30}
        color={props.focused ? "#fff" : "#9C9CA8"}
      />
    </BaseContainer>
  );
};

export default Home;

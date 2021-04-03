import React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { BaseContainer } from "../../../../GlobalStyles/Containers.Style";
import { IconProps } from "../../../Interfaces";

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
      backgroundColor="#000"
      align="center"
      justify="center"
    >
      <SimpleLineIcons
        style={{ marginLeft: 5 }}
        name="control-play"
        size={30}
        color="#fff"
      />
    </BaseContainer>
  );
};

export default Home;

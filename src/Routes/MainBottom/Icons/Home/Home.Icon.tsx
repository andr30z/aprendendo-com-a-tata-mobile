import React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { BaseContainer } from "../../../../GlobalStyles/Containers.Style";

const Home: React.FC<{
  focused: boolean;
  color: string;
  size: number;
}> = (props) => {
  return (
    <BaseContainer
      style={{
        position: "absolute",
        top: -25,
        borderRadius: 60 / 2,
        height: 60,
        width: 60,
      }}
      backgroundColor="blue"
      align="center"
      justify="center"
    >
      <SimpleLineIcons
        style={{ marginLeft: 5 }}
        name="control-play"
        size={35}
        color="#fff"
      />
    </BaseContainer>
  );
};

export default Home;

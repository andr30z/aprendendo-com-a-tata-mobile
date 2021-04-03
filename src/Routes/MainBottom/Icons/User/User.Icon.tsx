import React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { IconProps } from "../../../Interfaces";
import { FontAwesome } from "@expo/vector-icons";
const User: React.FC<IconProps> = (props) => {
  return (
    <FontAwesome
      name="smile-o"
      color="black"
      // style={{ marginTop: 3 }}
      size={27}
    />
  );
};

export default User;

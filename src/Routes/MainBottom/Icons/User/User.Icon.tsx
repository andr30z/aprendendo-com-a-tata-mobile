import React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { IconProps } from "../../../Interfaces";
import { FontAwesome } from "@expo/vector-icons";

/**
 * This is the Icon of the User page, it's going to appear on the Main Navigation.
 *
 * @author andr30z
 **/
const User: React.FC<IconProps> = (props) => {
  return (
    <FontAwesome
      name="smile-o"
      color={"#fff"}
      // style={{ marginTop: 3 }}
      size={27}
    />
  );
};

export default User;

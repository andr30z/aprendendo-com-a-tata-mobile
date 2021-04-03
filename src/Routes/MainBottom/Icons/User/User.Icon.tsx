import React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { IconProps } from "../../../Interfaces";

const User: React.FC<IconProps> = (props) => {
  return (
    <SimpleLineIcons
      style={{ marginTop: 15 }}
      name="user"
      size={25}
      color="blue"
    />
  );
};

export default User;

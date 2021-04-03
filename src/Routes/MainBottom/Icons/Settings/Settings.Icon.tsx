import React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { IconProps } from "../../../Interfaces";

const Settings: React.FC<IconProps> = (props) => {
  return (
    <SimpleLineIcons
      name="settings"
      size={27}
      color="#000"
      style={{ marginTop: 3 }}
    />
  );
};

export default Settings;

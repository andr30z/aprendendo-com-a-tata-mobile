import React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { IconProps } from "../../../Interfaces";


/**
* This is the Icon of the Settings page, it's going to appear on the Main Navigation.
* 
* @author andr3z0
**/
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

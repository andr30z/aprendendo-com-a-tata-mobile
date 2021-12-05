import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IconProps } from "../../../Interfaces";
import { FontAwesome5 } from "@expo/vector-icons";
import { useUserContext } from "../../../../Contexts";
import { UserType } from "../../../../Interfaces/index";
/**
 *
 * @author andr3z0
 **/
const ClassRoom: React.FC<IconProps> = (props) => {
  const { user } = useUserContext();
  const userIsTeacher = user?.type === UserType.T;
  const Icon = userIsTeacher ? FontAwesome5 : MaterialCommunityIcons;
  return (
    <Icon
      size={27}
      color={props.focused ? "#fff" : "#9C9CA8"}
      name={userIsTeacher ? "chalkboard-teacher" : "google-classroom"}
    />
  );
};

export default ClassRoom;

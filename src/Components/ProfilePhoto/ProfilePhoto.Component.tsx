import React from "react";
import { ImageSourcePropType, ImageStyle, StyleProp } from "react-native";
import { ImageProfile, ImageProfileProps } from "./Styles";
/**
 * Default profile pic component.
 * @author andr30z
 **/
const ProfilePhoto: React.FC<
  ImageProfileProps & {
    source: ImageSourcePropType;
    style?: StyleProp<ImageStyle>;
  }
> = (props) => {
  return <ImageProfile {...props} />;
};

export default ProfilePhoto;

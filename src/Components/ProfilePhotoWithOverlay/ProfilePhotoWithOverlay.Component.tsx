import React from "react";
import {
  ImageSourcePropType,
  ImageStyle,
  ImageURISource,
  Pressable,
  StyleProp,
} from "react-native";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import ProfilePhoto from "../ProfilePhoto/ProfilePhoto.Component";
import { ImageProfileProps } from "../ProfilePhoto/Styles";
import { Overlay, styles } from "./Styles";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
interface ProfilePhotoWithOverlayProps {
  size: number;
  onPress: () => void;
}

/**
 * Default profile pic component with an overlay.
 * @author andr30z
 **/
const ProfilePhotoWithOverlay: React.FC<
  ImageProfileProps &
    ProfilePhotoWithOverlayProps & {
      source: ImageURISource;
      style?: StyleProp<ImageStyle>;
    }
> = ({ size, source, style, onPress }) => {
  const sizePx = size + "px";
  return (
    <BaseContainer
      position="relative"
      height={sizePx}
      width={sizePx}
      style={styles.container}
      borderRadius={size / 2 + "px"}
    >
      <Pressable style={{ flex: 1 }} onPress={onPress}>
        {source.uri ? (
          <ProfilePhoto source={source} style={[style, styles.profile]} />
        ) : (
          <MaterialCommunityIcons
            style={styles.icon}
            size={size}
            name="face-profile"
            color="#fff"
          />
        )}
        <Overlay>
          <AntDesign name="edit" size={18} color="#fff" />
        </Overlay>
      </Pressable>
    </BaseContainer>
  );
};

export default ProfilePhotoWithOverlay;

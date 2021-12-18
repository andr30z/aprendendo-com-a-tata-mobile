import React from "react";
import { Image } from "react-native";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import {
  BaseContainer,
  ScrollContainer,
} from "../../GlobalStyles/Containers.Style";
import { UserInterface } from "../../Interfaces/index";
import { formatFilePathUrl } from "../../Utils";
import { ChildImage, TouchableCard } from "./Styles";

interface ChildrenCardItemProps {
  child: UserInterface;
  onPress: (child: UserInterface) => void;
  isSelectedChildren: boolean;
  primaryTheme: string;
}
/**
 *
 * @author andr30z
 **/
const ChildrenCardItem: React.FC<ChildrenCardItemProps> = ({
  child,
  onPress,
  isSelectedChildren,
  primaryTheme,
}) => {
  return (
    <TouchableCard
      isSelected={isSelectedChildren}
      borderTheme={primaryTheme}
      onPress={() => onPress(child)}
    >
      <BaseContainer flex={1}>
        <ChildImage
          source={{ uri: formatFilePathUrl(child.profilePhoto?.path) }}
        />
        <BaseContainer
          width="100%"
          height="20%"
          align="center"
          justify="center"
        >
          <BaseText ellipsizeMode="tail" numberOfLines={2} fontSize="15px" color="black" align="center">
            {child.name}
          </BaseText>
        </BaseContainer>
      </BaseContainer>
    </TouchableCard>
  );
};

export default ChildrenCardItem;

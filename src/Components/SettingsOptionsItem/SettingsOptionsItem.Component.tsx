import React from "react";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { MaterialIcons } from "@expo/vector-icons";
import { styles, TouchableSettingsItemContainer } from "./Styles";
interface SettingsOptionsItemProps {
  icon: (props: { color: string; size: number }) => React.ReactNode;
  title: string;
  subTitle?: string;
  onPress?: () => void;
  color?: string;
}
const SettingsOptionsItem: React.FC<SettingsOptionsItemProps> = ({
  icon,
  subTitle,
  title,
  color = "#323232",
  onPress,
}) => {
  return (
    <TouchableSettingsItemContainer onPress={onPress}>
      {icon({ color: color, size: 25 })}
      <BaseContainer flex={1} flexDirection="column" marginLeft="20px">
        <BaseText color={color} fontSize="15px" fontWeight="bold">
          {title}
        </BaseText>
        {subTitle && (
          <BaseText color={color} fontSize="13px" fontWeight="500">
            {subTitle}
          </BaseText>
        )}
      </BaseContainer>
      <MaterialIcons name="keyboard-arrow-right" size={24} color={color} />
    </TouchableSettingsItemContainer>
  );
};

export default SettingsOptionsItem;

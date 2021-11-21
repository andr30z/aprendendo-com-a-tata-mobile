import React from "react";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { CardItem } from "./Styles";
import { AntDesign } from "@expo/vector-icons";
interface CardItemInterface {
  title?: string;
  icon: any;
  value: any;
}

interface CardSelectProps {
  selectLabel?: string;
  onPress: (item: CardItemInterface) => void;
  cardItems: Array<CardItemInterface>;
  primaryColor: string;
  activeColor: string;
  selectedItemValue?: any;
  marginVertical?: string;
}

/**
 * Select component
 * @author andr3z0
 **/
const CardSelect: React.FC<CardSelectProps> = ({
  onPress,
  selectLabel,
  cardItems,
  selectedItemValue,
  primaryColor,
  activeColor,
  marginVertical,
}) => {
  return (
    <BaseContainer
      marginVertical={marginVertical}
      flexDirection="column"
      align="flex-start"
    >
      {selectLabel && (
        <BaseText color={primaryColor} fontSize="20px" align="center">
          {selectLabel}
        </BaseText>
      )}
      <BaseContainer
        flex={1}
        style={{ minHeight: 30 }}
        flexDirection="row"
        flexWrap="wrap"
        justify="center"
      >
        {cardItems.map((x, index) => {
          const Icon = x.icon;
          const isSelected = selectedItemValue === x.value;
          const color = isSelected ? activeColor : primaryColor;
          return (
            <CardItem onPress={() => onPress(x)} key={x.value + "-" + index}>
              <BaseContainer
                flexDirection="column"
                align="center"
                justify="center"
                flex={1}
              >
                <Icon size={30} color={color} />
                {x.title && (
                  <BaseText color={color} fontSize="12px">
                    {x.title}
                  </BaseText>
                )}
                {isSelected && (
                  <AntDesign
                    name="checkcircleo"
                    size={18}
                    color={activeColor}
                    style={{ position: "absolute", top: 5, right: 5 }}
                  />
                )}
              </BaseContainer>
            </CardItem>
          );
        })}
      </BaseContainer>
    </BaseContainer>
  );
};

export default CardSelect;

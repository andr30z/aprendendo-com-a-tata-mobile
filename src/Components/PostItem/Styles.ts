import { StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";

interface PostItemContainerProps {
  deviceHeight: number;
}

export const PostItemContainer = styled(BaseContainer) <PostItemContainerProps>`
  width: 100%;
  /* padding-horizontal: 3%; */
  padding-vertical: 2%;
  justify-content: center;
  margin-top: 10px;
  background-color: #fff;
  min-height: ${({ deviceHeight }) => deviceHeight * 0.3 + "px"};
`;

export const TextPostContainer = styled(BaseContainer)`
  padding-vertical: 5%;
  padding-horizontal: 3%;
  z-index: -1;
  flex:10;
`;

export const ActivityContainer = styled(BaseContainer)`
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 110px;
`;

export const PostFooterContainer = styled(BaseContainer)`
  border-top-width: 1px;
  border-top-color: #c3c3c3;
  padding-vertical: 8px;
  max-height:50px;
  padding-horizontal: 3%;
  width: 100%;
  flex-direction: row;
`;

export const TouchableHeader = styled(TouchableHighlight) <{
  deviceWidth: number;
}>`
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  padding: 10px;
  padding-horizontal: 3%;
  width: ${({ deviceWidth }) => deviceWidth + "px"};
`;

export const styles = StyleSheet.create({
  iconComment: {
    marginLeft: 10,
  },
  iconDots: {
    marginTop: 8,
  },
  dotsContainer: {
    flex: 1,
    top: 10,
    position: "absolute",
    zIndex: 3,
    right: 15,
    padding: 2.7,
    width: 55,
    height: 170,
    overflow: "hidden",
    borderRadius: 30,
    alignItems: "center",
  },
});

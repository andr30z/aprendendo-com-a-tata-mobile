import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";

interface PostItemContainerProps {
  deviceHeight: number;
}

export const PostItemContainer = styled(BaseContainer)<PostItemContainerProps>`
  width: 100%;
  padding-horizontal: 5%;
  padding-vertical: 2%;
  justify-content: center;
  margin-top: 10px;
  background-color: #fff;
  min-height: ${({ deviceHeight }) => deviceHeight * 0.3 + "px"};
`;

export const TextPostContainer = styled(BaseContainer)<{ isClosed: boolean }>`
  flex: ${({ isClosed }) => (isClosed ? 0.5 : 1)};
  padding-vertical: 5%;
`;

export const PostFooterContainer = styled(BaseContainer)`
  border-top-width: 1px;
  border-top-color: #c3c3c3;
  margin-top: 10px;
  padding-top: 5px;
  width: 100%;
  flex-direction: row;
`;


export const styles = StyleSheet.create({
  iconComment:{
    marginLeft:10
  }
})

import styled from "styled-components/native";

export const ItemTitle = styled.Text`
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  text-align: center;
`;

export const ButtonContainer = styled.TouchableOpacity<{
  backgroundColor: string;
  height: string;
  width:string
}>`
  margin-top: 20px;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  background-color: ${(props) => props.backgroundColor};
  border-radius: 30px;
  padding-vertical: 5%;
  padding-horizontal: 20px;
`;

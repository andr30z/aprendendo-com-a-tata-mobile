import styled, { css } from "styled-components/native";

export const GroupTitle = styled.Text`
  font-size: 20px;
  text-align: left;
  font-weight: bold;
  color: #f7cc7f;
`;

const commonPositionStyles = css`
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 8px;
  height: 50px;
  width: 50px;
`;

export const GroupLevelContainer = styled.View`
  background: #8078cc;
  transform: rotateZ(13deg);
  ${commonPositionStyles}
`;

export const GroupLevelInnerContainer = styled.View`
  background: #f7cc7f;

  flex: 1;
  align-items: center;
  justify-content: center;

  ${commonPositionStyles}
`;

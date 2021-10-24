import styled, { css } from "styled-components/native";

export interface ImageProfileProps {
  size?: number;
}

export const ImageProfile = styled.Image<ImageProfileProps>`
  ${({ size }) => {
    const defaultSize = size || 40;
    const defaultSizeWithPx = defaultSize + "px";
    return css`
      height: ${defaultSizeWithPx};
      width: ${defaultSizeWithPx};
      border-radius: ${defaultSize / 2}px;
    `;
  }}
`;

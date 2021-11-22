import React from "react";
import {
  Fade,
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
} from "rn-placeholder";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
const quantityArrayFrom = [...Array(5)];
const ClassroomListingSkeleton: React.FC = () => (
  <>
    {quantityArrayFrom.map((_, index) => (
      <Placeholder
        key={index}
        style={{
          height: 150,
          marginTop: 20,
          width: "100%",
          justifyContent: "flex-start",
          alignItems: "baseline",
          flexDirection: "column",
        }}
        Animation={(props) => <Fade {...props} duration={900} />}
      >
        <BaseContainer
          flex={1}
          height="50px"
          flexDirection="row"
          align="center"
        >
          <PlaceholderMedia style={{ borderRadius: 20 }} />
          <PlaceholderLine style={{ width: "100%", marginLeft: 10 }} />
        </BaseContainer>
        <BaseContainer marginTop="15px">
          <PlaceholderLine style={{ width: "100%" }} />
          <PlaceholderLine style={{ width: "40%" }} />
        </BaseContainer>
        <BaseContainer justify="flex-end" align="flex-end">
          <PlaceholderLine style={{ width: "30%" }} />
        </BaseContainer>
      </Placeholder>
    ))}
  </>
);

export default ClassroomListingSkeleton;

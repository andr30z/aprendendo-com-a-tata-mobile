import React from "react";
import Clouds from "../Clouds/Clouds.Background";
import { ACTIVITY_CONSTANTS } from "../../../../Constants";
import { BaseContainer } from "../../../../GlobalStyles/Containers.Style";
import LearningObjects from "../LearningObjects/LearningObjects.Background";
import TataWithButterfly from "../TataWithButterfly/TataWithButterfly.Background";
interface BackgroundSwitchProps {
  activityType: string;
}
const BackgroundSwitch: React.FC<BackgroundSwitchProps> = ({
  activityType,
}) => {
  return (
    <BaseContainer
      position="absolute"
      style={{ bottom: 0, zIndex: 0 }}
      flex={1}
    >
      {(() => {
        switch (activityType) {
          case ACTIVITY_CONSTANTS.CMP:
          case ACTIVITY_CONSTANTS.NO:
            return <TataWithButterfly />;

          case ACTIVITY_CONSTANTS.NS:
          case ACTIVITY_CONSTANTS.LLDCW:
            return <LearningObjects />;

          // case ACTIVITY_CONSTANTS.NS:
          case ACTIVITY_CONSTANTS.LLCW:
            return <Clouds />;
          default:
            return null;
        }
      })()}
    </BaseContainer>
  );
};

export default BackgroundSwitch;

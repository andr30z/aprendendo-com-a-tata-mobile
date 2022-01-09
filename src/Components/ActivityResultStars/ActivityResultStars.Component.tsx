import React, { useMemo } from "react";
import { AntDesign } from "@expo/vector-icons";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";

interface ActivityResultStarsProps {
  result: number;
  /**
   * Default value: 12
   * @author andr3z0
   **/
  starSize?: number;
  /**
   * This prop controls whether it should render the stars insede a ```<View />```.
   *
   * Default value: true
   * @author andr3z0
   **/
  withContainer?: boolean;
}
/**
 * This component renders the activity result visualization in form of stars.
 * @author andr3z0
 **/
const ActivityResultStars: React.FC<ActivityResultStarsProps> = ({
  result,
  withContainer = true,
  starSize = 12,
}) => {
  const stars = useMemo(() => Array.from({ length: 5 }), []);
  const starRender = stars.map((_, position) => {
      const realPosition = position+1;
    return (
      <AntDesign
        key={String(position)}
        name="star"
        size={starSize}
        color={result === 0 || realPosition > result ? "#c1c1c1" : "#e5e500"}
        style={{ alignSelf: "center" }}
      />
    );
  });
  if (withContainer)
    return <BaseContainer flexDirection="row">{starRender}</BaseContainer>;

  return <>{starRender}</>;
};

export default ActivityResultStars;

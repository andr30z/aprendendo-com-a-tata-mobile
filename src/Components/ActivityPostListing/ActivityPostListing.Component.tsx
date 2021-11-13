import React, { useMemo } from "react";
import { useWindowDimensions } from "react-native";
import {
  Fade,
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
  Shine,
  ShineOverlay,
} from "rn-placeholder";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { useActivityList } from "../../Hooks";
import { ActivityCommonProps, SetStateInterface } from "../../Interfaces/index";
import ActivityItem from "../ActivityItem/ActivityItem.Component";
interface ActivityPostListingProps {
  setSelectedActivities: SetStateInterface<Array<ActivityCommonProps<unknown>>>;
  selectedActivities: Array<ActivityCommonProps<unknown>>;
  isInputFocused: boolean;
}

const gridContainerStyles = {
  flexDirection: "row",
  flexWrap: "wrap",
  width: "100%",
  marginTop: "10px",
  align: "center",
  justify: "space-evenly",
};

const gridItemWidth = "31.5%";

/**
 *
 * @author andr3z0
 **/
const ActivityPostListing: React.FC<ActivityPostListingProps> = ({
  selectedActivities,
  setSelectedActivities,
  isInputFocused
}) => {
  const { activities, isLoading } = useActivityList();
  const onPressActivity = (activity: ActivityCommonProps<unknown>) => () =>
    setSelectedActivities((pastState) => {
      const list = [...pastState];
      if (list.find((x) => x._id === activity._id)) return pastState;
      list.push(activity);
      return list;
    });

  const removeActivity = (index: number) => () =>
    setSelectedActivities((pastState) => {
      const list = [...pastState];
      list.splice(index, 1);
      return list;
    });
  const skeletonArray = useMemo(() => [...Array(9)], []);
  const { height } = useWindowDimensions();
  const hasSelectedItem = selectedActivities.length > 0;
  if (isInputFocused) return null;
  return (
    <>
      <BaseContainer
        marginBottom={hasSelectedItem ? "10px" : undefined}
        flexDirection="row"
      >
        <BaseText fontWeight="bold" fontSize="20px" color="black" align="left">
          Atividades
        </BaseText>
      </BaseContainer>
      {hasSelectedItem && (
        <>
          <BaseContainer flexDirection="column">
            <BaseText color="black" align="left">
              Atividades Selecionadas:
            </BaseText>
            <BaseContainer {...(gridContainerStyles as any)} marginTop="10px">
              {selectedActivities.map((activity, index) => (
                <ActivityItem
                  roundedBorders={false}
                  boxWidth={gridItemWidth}
                  marginTop="3px"
                  onPress={removeActivity(index)}
                  key={activity._id}
                  itemIndex={index}
                  {...activity}
                />
              ))}
            </BaseContainer>
          </BaseContainer>
          <BaseContainer
            style={{
              borderWidth: 1,
              borderColor: "#355389",
              marginVertical: 5,
            }}
            width="100%"
          />
        </>
      )}
      {!isLoading ? (
        <BaseContainer {...(gridContainerStyles as any)}>
          {activities.map((activity, index) => (
            <ActivityItem
              roundedBorders={false}
              boxWidth={gridItemWidth}
              marginTop="3px"
              onPress={onPressActivity(activity)}
              key={activity._id}
              itemIndex={index}
              {...activity}
            />
          ))}
        </BaseContainer>
      ) : (
        <BaseContainer {...(gridContainerStyles as any)}>
          {skeletonArray.map((_, index) => (
            <Placeholder
              style={{
                width: gridItemWidth,
                height: height * 0.2,
                marginTop: 3,
              }}
              Animation={(props) => <Fade {...props} duration={900} />}
              key={index}
            >
              <PlaceholderMedia style={{ width: "100%", height: "100%" }} />
            </Placeholder>
          ))}
        </BaseContainer>
      )}
    </>
  );
};

export default ActivityPostListing;

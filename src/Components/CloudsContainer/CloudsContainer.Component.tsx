import React from "react";
import Cloud from "../Cloud/Cloud.Component";
import { styles } from "./Styles";
const cloudStyle = {
  cloudHeight: "15%",
  cloudWidth: "60px",
};

/**
 * As the name suggests, this is a container of all the clouds in the initial page
 * @author andr30z
 **/
const CloudsContainer: React.FC = () => {
  return (
    <>
      <Cloud
        {...cloudStyle}
        direction="right"
        color="blue"
        cloudStyle={[{ right: -15 }, styles.baseStyle]}
      />
      <Cloud
        {...cloudStyle}
        direction="left"
        color="red"
        cloudStyle={[{ left: -15, top: 15 }, styles.baseStyle]}
      />
      <Cloud
        {...cloudStyle}
        cloudWidth="70px"
        direction="left"
        color="white"
        cloudStyle={[{ right: 60, top: 80 }, styles.baseStyle]}
      />
      <Cloud
        {...cloudStyle}
        cloudWidth="70px"
        direction="left"
        color="yellow"
        cloudStyle={[{ left: 50, top: 100 }, styles.baseStyle]}
      />
      <Cloud
        cloudHeight="15%"
        cloudWidth="70px"
        direction="left"
        color="white"
        cloudStyle={[{ left: 10, bottom: 100 }, styles.baseStyle]}
      />
      <Cloud
        {...cloudStyle}
        direction="left"
        color="yellow"
        cloudStyle={[{ right: 25, bottom: 63 }, styles.baseStyle]}
      />
      <Cloud
        {...cloudStyle}
        direction="left"
        color="yellow"
        cloudStyle={[
          { bottom: "50%", left: "10%", alignSelf: "center" },
          styles.baseStyle,
        ]}
      />
      <Cloud
        {...cloudStyle}
        direction="right"
        color="red"
        cloudStyle={[
          { bottom: "49%", right: "5%", alignSelf: "center" },
          styles.baseStyle,
        ]}
      />
    </>
  );
};

export default CloudsContainer;

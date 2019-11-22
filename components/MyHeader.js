import React from "react";
import { Header } from "react-native-elements";

import HamburgerMenu from "./HamburgerMenu";

const MyHeader = props => {
  return (
    <Header
      leftComponent={<HamburgerMenu navigation={props.navigation} />}
      centerComponent={{
        text: props.title,
        style: { color: "#fff", fontWeight: "bold" }
      }}
      statusBarProps={{ barStyle: "light-content" }}
      containerStyle={{
        backgroundColor: '#3a5335',
        justifyContent: 'space-around',
      }}
    />
  );
};

export default MyHeader;
import React from "react";
import { Text } from "react-native"
import { Header } from "react-native-elements";
import styles  from './styles';
import HamburgerMenu from "./HamburgerMenu";

const MyHeader = props => {
  return (
    <Header
      leftComponent={<HamburgerMenu navigation={props.navigation} />}
      centerComponent={{
        text: props.title,
        style: styles.heading3
      }}
      rightComponent={props.money && <Text style={styles.heading2}>${props.money}</Text>}
      statusBarProps={{ barStyle: "light-content" }}
      containerStyle={{
        backgroundColor: '#3a5335',
        justifyContent: 'space-around',
      }}
    />
  );
};

export default MyHeader;
import React from "react";
import { Text, View } from "react-native"
import { Header } from "react-native-elements";
import styles  from './styles';
import HamburgerMenu from "./HamburgerMenu";

export default class MyHeader extends React.Component {
  constructor() {
    super();
  }

  render(){
    return (
      <View>
        { this.props.activeIcon === true && 
          <Header
            leftComponent={<HamburgerMenu navigation={this.props.navigation} />}
            centerComponent={{
              text: this.props.title,
              style: styles.heading3,
            }}
            rightComponent={this.props.money && <Text style={styles.heading2}>${this.props.money}</Text>}
            statusBarProps={{ barStyle: "light-content" }}
            containerStyle={{
              backgroundColor: '#3a5335',
              justifyContent: 'space-around',
            }}
          />
        }
        { this.props.activeIcon === false && 
          <Header
            centerComponent={{
              text: this.props.title,
              style: styles.heading3,
            }}
            rightComponent={this.props.money && <Text style={styles.heading2}>${this.props.money}</Text>}
            statusBarProps={{ barStyle: "light-content" }}
            containerStyle={{
              backgroundColor: '#3a5335',
              justifyContent: 'space-around',
            }}
          />
        }
      </View>
    );
  }
};
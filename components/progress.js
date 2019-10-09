import React from "react";
import { View, Text } from "react-native";
import MyHeader from './MyHeader';

export default class progress extends React.Component {
  render (){
    return (
      <View>
        <MyHeader navigation={this.props.navigation} title="Progress" />
        <Text>This is your progress</Text>
      </View>
    );
    }
}
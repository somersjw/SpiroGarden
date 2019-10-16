import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import MyHeader from './MyHeader';

export default class Settings extends React.Component {
    render (){
        return (
            <View>
                <MyHeader navigation={this.props.navigation} title="Settings"/>
            </View>
        );
      }
}
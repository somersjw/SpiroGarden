import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import MyHeader from './MyHeader';

export default class progress extends React.Component {
  _onPress() {
    // could pass in a parameter for whether day, week, or month was pressed
    // then fetch the right data and display info
    alert('Progress button pressed')
  }
  render (){
    return (
      <View>
        <MyHeader navigation={this.props.navigation} title="Progress"/>
        <View style={styles.container}>
          <Button onPress={this._onPress} title="Day" buttonStyle={styles.button}/>
          <Button onPress={this._onPress} title="Week" buttonStyle={styles.button}/>
          <Button onPress={this._onPress} title="Month" buttonStyle={styles.button}/>
        </View>
        <Text>GOAL:</Text>
        <Text>3 rounds per day</Text>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'center',
   marginTop: 20,
  },

  button: {
    backgroundColor: '#229637',
  }
});
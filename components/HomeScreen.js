import React from 'react';
import { Image, Text, View, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import MyHeader from './MyHeader';
import Countdown from './Countdown';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.playGame = this.playGame.bind(this);
    this.fetchSpiroData = this.fetchSpiroData.bind(this);
    this.performTimeConsumingTask = this.performTimeConsumingTask.bind(this);
  }

  performTimeConsumingTask = async() => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        3000
      )
    );
  }

  async fetchSpiroData(){
    return new Promise(function(resolve, reject) {
        fetch('http://67.205.163.230', {header: {
          'Content-Type': 'application/json'}
        })
          .then((response) => resolve(response.json()))
          .catch((error) =>{
            console.error(error);
          });
    })
}

  async playGame(){
  i = 1;
  json = {};
  while (i < 97) {
    i += 1;
    json = await this.fetchSpiroData();
    i = json.val;
    this.setState({
      quality: json.quality,
      val: json.val
    })
  }
  // need to toggle the countdown "running" prop to true here
  Alert.alert("finished")
}
    render() {
      return (
        <View>
        <MyHeader navigation={this.props.navigation} title="Home" />
        <Text> Current Spriometer Values</Text>
        <Text> Quality: {this.state.quality} Val: {this.state.val}</Text>
        <Image source={require('./plant_1.png')} />
        <Countdown/>
        <Button 
        title="Start Game"
        onPress={this.playGame}
        />
      </View>
      );
    }
  }
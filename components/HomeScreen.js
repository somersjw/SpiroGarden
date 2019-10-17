import React from 'react';
import { Image, Text, View, Alert, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import MyHeader from './MyHeader';
import CountDown from 'react-native-countdown-component';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {showPlant: true,showButton: true, timer: 6, round: 1};
    this.playGame = this.playGame.bind(this);
    this.fetchSpiroData = this.fetchSpiroData.bind(this);
    this.intermission = this.intermission.bind(this);
    this.play10Times = this.play10Times.bind(this);
    this.AsyncAlert = this.AsyncAlert.bind(this);
  }

   async intermission() {
    this.setState({showPlant: false});
    return new Promise((resolve) =>
      setTimeout(
        () => { this.setState({showPlant: true}); resolve('result'); },
        6000
      )
    );
  }

  AsyncAlert(title, message) {
    return new Promise((resolve, reject) => {
        Alert.alert(
            title,
            message,
            [
                {text: "OK", onPress: () => { resolve('YES') }}
            ],
            { cancelable: false }
        )
    })
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

  async resetGame() {
    this.setState({
      quality: 0,
      val: 0
    })
    return new Promise(function(resolve, reject) {
      fetch('http://67.205.163.230/reset', {header: {
        'Content-Type': 'application/json'}
      })
        .then((response) => resolve(response))
        .catch((error) =>{
          console.error(error);
        });
  })
  }
  async playGame() {
    let maxFlow = 67;
    let badCount = 0;
    let prevQuantity = 0;
    let json = await this.fetchSpiroData();
    while (json.val < 97) {
      json = await this.fetchSpiroData();
      this.setState({
        quality: json.quality,
        val: json.val
      })

      if (json.val < prevQuantity) {
        return false;
      }
      if (json.quality > maxFlow) {
        badCount += 1;
      }
      else {
        badCount = 0;
      }
      if (badCount > 6) {
        return false;
      }
      prevQuantity = json.val;
    }
    return true;
}
  async play10Times() {
    this.setState({showButton: false})
    while (this.state.round <= 10) {
      let message = 'Bad Flow';
      await this.resetGame();
      if(await this.playGame()) {
        this.setState({round: this.state.round + 1});
        await this.intermission();
        await this.AsyncAlert("Success", "Move onto the next round.");
      }
      else {
        await this.AsyncAlert("Try Again", "Make sure to keep within the good range");
      }
    }
    this.setState({showButton: true})
  }
    render() {
      return (
        <View style={styles.container}>
        <MyHeader navigation={this.props.navigation} title="Home" />
        <Text> Round: {this.state.round} </Text>
        { this.state.showPlant && <>
        <Text> Current Spriometer Values</Text>
        <Text> Quality: {this.state.quality} Val: {this.state.val}</Text>
        <Image source={require('./plant_1.png')} />
        </>
        }
        { !this.state.showPlant && 
            <CountDown
                until={this.state.timer}
                size={30}
                onFinish={() => this.setState({timer: 6})}
                digitStyle={{backgroundColor: '#1CC625'}}
                digitTxtStyle={{color: '#FFF'}}
                timeToShow={['S']}
                timeLabels={{s: 'Hold Your Breath'}}
                running={!this.state.showPlant}
            /> }
        {this.state.showButton && <Button 
        title="Start Game"
        buttonStyle={styles.startButton}
        onPress={this.play10Times}
        />}
      </View>
      );
    }
  }

  const styles = StyleSheet.create({
    startButton: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#229637',
      width: 125
    },
    container: {
      alignItems: 'center',
    }
  });
  
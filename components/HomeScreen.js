import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import MyHeader from './MyHeader';
import CountDown from 'react-native-countdown-component';
import styles from './styles';
import Plant from './Plant';
import { AsyncAlert, fetchSpiroData, getData, changePlant, initializePlant } from './gameFunctions';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {showPlant: true,showButton: true, timer: 6, round: 1};
    this.playGame = this.playGame.bind(this);
    this.intermission = this.intermission.bind(this);
    this.play10Times = this.play10Times.bind(this);
    this.Quickreset = this.Quickreset.bind(this);
  }

  async componentDidMount() {
    await initializePlant();
    let plantLevel = parseInt(await getData('@plant_level'));
    this.setState({
      plantLevel: plantLevel
    });
    console.log(this.state.plantLevel.toString());
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

  async Quickreset(){
    this.setState({
      plantLevel: 0
    });
    await changePlant(-1);
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
    let json = await fetchSpiroData();
    while (json.val < 97) {
      json = await fetchSpiroData();
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
    while (this.state.round <= 2) {
      await this.resetGame();
      if(await this.playGame()) {
        await this.intermission();
        await AsyncAlert("Success", "Move onto the next round.");
        this.setState({round: this.state.round + 1});
      }
      else {
        await AsyncAlert("Try Again", "Make sure to keep within the good range");
      }
    }
    let nextLevel = this.state.plantLevel + 1;
    if (nextLevel >= 4) {
      nextLevel = 4;
    }
    this.setState({
      showButton: true,
      plantLevel: nextLevel,
      round: 1
    })
    changePlant(1);
  }
    render() {
      return (
        <View style={styles.homescreen}>
        <MyHeader navigation={this.props.navigation} title="Home" />
        <Text style={styles.heading1}> Round: {this.state.round} / 10</Text>
        { this.state.showPlant && <>
        <Text style={styles.titlemedium}>Current Spirometer Values</Text>
        <Text style={styles.heading1}> Quality: {this.state.quality} Val: {this.state.val}</Text>
        <Plant plantState={this.state.plantLevel}/>
        </>
        }
        { !this.state.showPlant && 
            <CountDown
                until={this.state.timer}
                size={30}
                onFinish={() => this.setState({timer: 6})}
                digitStyle={{backgroundColor: '#229637'}}
                digitTxtStyle={{color: '#FFF'}}
                timeToShow={['S']}
                timeLabels={{s: 'Hold Your Breath'}}
                timeLabelStyle={styles.titlemedium}
                running={!this.state.showPlant}
            /> }
        {this.state.showButton && (
          <View>
            <Button 
              title="Start Game"
              buttonStyle={styles.startButton}
              onPress={this.play10Times}
              />
            <Button title='Reset' color="#229637" onPress={this.Quickreset} />
          </View>
        )}
      </View>
      );
    }
  }
  
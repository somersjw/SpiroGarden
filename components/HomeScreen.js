import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import MyHeader from './MyHeader';
import CountDown from 'react-native-countdown-component';
import { copilot, walkthroughable, CopilotStep } from 'react-native-copilot';
import styles from './styles';
import Plant from './Plant';
import { AsyncAlert, fetchSpiroData, getData, changePlant, initializePlant , saveprogress, resetGame } from './gameFunctions';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'CompletedRounds.db' });
import { sendLocalNotification } from './notifications';
import moment from 'moment';


// For the tutorial when the user first loads the page
const CopilotView = walkthroughable(View);

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {showPlant: true,showButton: true, timer: 6, round: 1};
    this.playGame = this.playGame.bind(this);
    this.intermission = this.intermission.bind(this);
    this.play10Times = this.play10Times.bind(this);
    this.Quickreset = this.Quickreset.bind(this);
    this.progression = this.progression.bind(this);
  }

  async componentDidMount() {
    await initializePlant();
    let plantLevel = parseInt(await getData('@plant_level'));
    let plantprogress = parseInt(await getData('@plant_progress'));
    this.setState({
      plantLevel: plantLevel,
      plantprogress: plantprogress
    });
    console.log(this.state.plantLevel.toString());
    this.props.start(); // runs the tutorial
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
      plantLevel: 1,
      plantprogress: 0,
      goodBreathCount: 0
    });
    await changePlant(-1);
  }

  async progression(count,fullcount){
    let divided = parseFloat(count)/parseFloat(fullcount);
    let addtosum = 0;
    addtosum += 5;
    if(divided >= 0.25){
      addtosum += 5;
      if(divided >= 0.5){
        addtosum += 5;
        if(divided >= 0.75){
          addtosum += 5;
          if(divided = 1){
            addtosum += 20;
          }
        }
      }
    }
    sum = this.state.plantprogress + addtosum;
    this.setState({
      plantprogress: sum
    });
    saveprogress(sum.toString());
    return 0;
  }
  
  async playGame() {
    let maxFlow = 67;
    let badCount = 0;
    let fullcount = 0;
    let goodCount = 0;
    let prevQuantity = 0;
    let json = await fetchSpiroData();
    while (json.val < 97) {
      json = await fetchSpiroData();
      this.setState({
        quality: json.quality,
        val: json.val
      })
      fullcount += 1
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
      if (json.quality < 34){
        goodCount += 1;
      }
      prevQuantity = json.val;
    }

    await this.progression(goodCount,fullcount);
    return true;
}
  async play10Times() {
    let sumFlowVals = 0;
    let avgFlow = 0;
    this.setState({showButton: false})
    while (this.state.round <= 1) {
      await resetGame();
      if(await this.playGame()) {
        await this.intermission();
        await AsyncAlert("Success", "Move onto the next round.");
        sumFlowVals += this.state.quality;
        this.setState({
          round: this.state.round + 1,
          goodBreathCount: this.state.goodBreathCount + 1
        })
      }
      else {
        await AsyncAlert("Try Again", "Make sure to keep within the good range");
      }
      if(this.state.plantprogress >= 200){
        let nextLevel = this.state.plantLevel + 1;
        if (nextLevel >= 4) {
          nextLevel = 4;
        }
        this.setState({
          plantLevel: nextLevel,
          plantprogress: 0
        })
        changePlant (1);
      }
    }
    let dateTime = new Date();
    avgFlow = parseFloat(sumFlowVals)/parseFloat(this.state.round);
    db.transaction(function(tx) {
      tx.executeSql('INSERT INTO rounds(timeCompleted, goodBreathsCompleted, maxVolume, avgFlow) VALUES (?,?,?)',
                    [dateTime.toISOString(), this.state.goodBreathCount, this.state.val, avgFlow],
                    (tx, results) => {
                      console.log('Round logged in database');
                    }

      )
    })

    this.setState({
      showButton: true,
      round: 1,
      goodBreathCount: 0
    })
    changePlant(1);
    sendLocalNotification(moment().add(5, 'seconds')); // in 5 secs
  }
    render() {
      return (
        <View style={styles.homescreen}>
          {/* 
            Header material
            Everything labeled with Copilot gets shown during the tutorial walkthrough 
          */}
          <MyHeader navigation={this.props.navigation} title="Home" />
          <CopilotStep text="Welcome to SpiroGarden!" order={1} name="welcome">
            <CopilotView/>
          </CopilotStep>
          {/* Uses absolute positioning since I couldn't figure out how to make the header "walkthroughable" */}
          <CopilotStep text="Connect your incentive spirometer to this app and take care of your very own plant!" order={2} name="connect">
            <CopilotView style={styles.hamburger}/> 
          </CopilotStep>
          <CopilotStep text="Press this icon here to see your progress and set up your device" order={4} name="navigation">
            <CopilotView style={styles.hamburger} />
          </CopilotStep>

          {/* 
            Titles near top of page
          */}
          <Text style={styles.heading1}> Round: {this.state.round} / 10</Text>
          { this.state.showPlant && <>
          <CopilotStep text="Check how well you're breathing here!" order={5} name="spirometer data">
            <CopilotView>
              <Text style={styles.titlemedium}>Current Spirometer Values</Text>
              <Text style={styles.heading1}> progression: {this.state.plantprogress}</Text>
              <Text style={styles.heading1}> Quality: {this.state.quality} Val: {this.state.val}</Text>
            </CopilotView>
          </CopilotStep>
          <CopilotStep text="Here's where you can check your plant progress!" order={3} name="plant">
            <CopilotView style={styles.plant} />
          </CopilotStep>

          {/*
            Plant Image and CountDowns
          */}
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
            <CopilotStep text="Once you connect your spirometer, press Start and begin breathing!" order={6} name="start">
              <CopilotView>
                <Button 
                  title="Start Game"
                  buttonStyle={styles.button}
                  onPress={this.play10Times}
                  />
                <Button title='Reset' color="#229637" onPress={this.Quickreset} />
              </CopilotView>
            </CopilotStep>
          )}
        </View>
      );
    }
  }

export default copilot({
    verticalOffset: 25,
  })(HomeScreen);
  
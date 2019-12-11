import React from 'react';
import { ScrollView, Text, View, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import MyHeader from './MyHeader';
import CountDown from 'react-native-countdown-component';
import { copilot, walkthroughable, CopilotStep } from 'react-native-copilot';
import styles from './styles';
import Plant from './Plant';
import { AsyncAlert, fetchSpiroData, getData, storeData, changePlant, initializePlant , saveprogress, round , getdatmoney, sleep, fetchHardwareData, harvestFlower} from './gameFunctions';
import { sendLocalNotification } from './notifications';
import moment from 'moment';
import { insertAlert } from './dbGateway';
import * as Progress from 'react-native-progress';
import { withNavigationFocus } from 'react-navigation';


// For the tutorial when the user first loads the page
const CopilotView = walkthroughable(View);

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {money: 0, showPlant: true, showButton: true, timer: 6, round: 1, maxVolume: 0, sumFlowVals: 0, totalCount: 0, buttonCooldown: true, plantType: 1};
    this.playGame = this.playGame.bind(this);
    this.intermission = this.intermission.bind(this);
    this.play10Times = this.play10Times.bind(this);
    this.Quickreset = this.Quickreset.bind(this);
    this.progression = this.progression.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.fetchUserData = this.fetchUserData.bind(this);
    this.Sellplant = this.Sellplant.bind(this);
    this.checkCooldown = this.checkCooldown.bind(this);
    this.playGameHardware = this.playGameHardware.bind(this);
  }

  static navigationOptions = ({ navigation }) => ({
    drawerLockMode: navigation.state.params ? navigation.state.params.drawerLockMode : undefined});

  async componentDidMount() {
    await initializePlant();
    let money = await getdatmoney(0);
    timeaway = await getData('@cooldown');
    this.checkCooldown(timeaway);
    let plantLevel = parseInt(await getData('@plant_level'));
    let plantType = parseInt(await getData('@plant_type'));
    let plantprogress = parseInt(await getData('@plant_progress'));
    this.setState({
      money: money,
      plantLevel: plantLevel,
      plantprogress: plantprogress,
      plantType: plantType
    });
    let intro = await getData('@homescreen_tutorial');
    if (intro === '-1') {
      this.props.start(); // runs the tutorial
      await storeData('@homescreen_tutorial', '1');
    }

    await this.fetchUserData();
  }

  checkCooldown(timeaway) {
    if (Date.now() - parseFloat(timeaway) > 20 * 1000 || !timeaway){
      this.setState({buttonCooldown: false}); 
    }
    else {
      this.setState({buttonCooldown: true});
    }
  }
  async componentDidUpdate(prevProps) {
    if (this.props.isFocused && !prevProps.isFocused) {
      // Screen has now come into focus, call your method here 
      await this.fetchUserData();
      console.log("new data!");
      let timeaway = await getData('@cooldown');
      this.checkCooldown(timeaway);
      let money = await getdatmoney(0);
      this.setState({
        money: money
      });
    }
  }

  async fetchUserData() {
    let VOL = parseInt(await getData('@userVolume'));
    let BPR = parseInt(await getData('@userBPR'));
    let plantType = parseInt(await getData('@plant_type'));
    

    if (VOL === -1 || BPR === -1) {
      alert('Please fill out your regimen on the settings page');
      this.setState({showButton: false});
    }
    else {
      this.setState({
        showButton: true,
        userVolume: VOL,
        userBPR: BPR,
        plantType: plantType
      });
    }
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

  async Sellplant(){
    this.setState({
      money: this.state.money + 100,
      plantLevel: 3,
      plantprogress: 0,
    });
    await harvestFlower();
    await AsyncAlert("Success", "You harvested your plant's flower");
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

  async Quickreset(){
    this.setState({
      buttonCooldown: false,
      plantLevel: 4,
      plantprogress: 0,
      goodBreathCount: 0,
      maxVolume: 0,
      plantType: 1
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
    let sum = this.state.plantprogress + addtosum;
    this.setState({
      plantprogress: sum
    });
    saveprogress(sum.toString());
    return 0;
  }
  
  async playGameHardware() {
    let maxFlow = 67;
    let badCount = 0;
    let fullcount = 0;
    let goodCount = 0;
    let prevQuantity = 0;
    let volDecreaseCount = 0;
    let json = await fetchHardwareData();
    while (json.values[0] < this.state.userVolume) {
      json = await fetchHardwareData();
      this.setState({
        quality: json.values[1],
        val: json.values[0],
        sumFlowVals: this.state.sumFlowVals + json.values[1],
        totalCount: this.state.totalCount + 1
      })
      fullcount += 1
      if (json.values[0] < prevQuantity) {
        volDecreaseCount += 1;
        if (volDecreaseCount > 3) {
          return false;
        }
      }
      else {
        volDecreaseCount = 0;
      }
      if (json.values[1] > maxFlow) {
        badCount += 1;
      }
      else {
        badCount = 0;
      }
      if (badCount > 6) {
        return false;
      }
      if (json.values[1] < 34){
        goodCount += 1;
      }

      if (json.values[0] > this.state.maxVolume) {
        this.setState({
          maxVolume: json.values[0]
        });
      }

      prevQuantity = json.values[0];
      await sleep(200);
    }

    await this.progression(goodCount, fullcount);
    return true;
}

async playGame() {
  let maxFlow = 67;
  let badCount = 0;
  let fullcount = 0;
  let goodCount = 0;
  let prevQuantity = 0;
  let json = await fetchSpiroData();
  while (json.val < this.state.userVolume) {
    json = await fetchSpiroData();
    this.setState({
      quality: json.quality,
      val: json.val,
      sumFlowVals: this.state.sumFlowVals + json.quality,
      totalCount: this.state.totalCount + 1
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

    if (json.val > this.state.maxVolume) {
      this.setState({
        maxVolume: json.val
      });
    }

    prevQuantity = json.val;
    // await sleep(200);

  }

  await this.progression(goodCount, fullcount);
  return true;
}
  async play10Times() {
    this.props.navigation.setParams({ 
      drawerLockMode: 'locked-closed' });
    let roundsPassed = 0;
    this.setState({
      showButton: false, 
      plantWaterLevel: 1,
      plantSpring: false
    })
    while (this.state.round <= this.state.userBPR) {
      await this.resetGame();
      let result = await this.playGame();
      this.setState({round: this.state.round + 1});
      if(result) {
        await this.intermission();
        if (this.state.round <= this.state.userBPR) {
          await AsyncAlert("Success", "Move onto the next breath.");
        }
        roundsPassed += 1;
        await storeData('@interval_time',Date.now().toString())
      }
      else {
        if (this.state.round <= this.state.userBPR) {
          await AsyncAlert("Breath Failed", "Try to meet your Volume goal by inhaling slower and make sure keep an eye on the Flow meter!");
        }
      }
      if(this.state.plantprogress >= 200){
        let nextLevel = this.state.plantLevel + 1;
        if (nextLevel >= 4) {
          nextLevel = 4;
        }
        this.setState({
          plantLevel: nextLevel,
          plantprogress: 0,
          plantSpring: true
        })
        changePlant (1);
        this.setState({
          plantSpring: false
        })
      }
    }

    Alert.alert("Round Complete!", "You passed " + roundsPassed + " / " + this.state.userBPR + " breaths!");
    let dateTime = new Date();
    let avgFlow = parseFloat(this.state.sumFlowVals)/parseFloat(this.state.totalCount);

    insertAlert(dateTime.toISOString(), roundsPassed, this.state.maxVolume, round(avgFlow, 1));
    this.setState({
      showButton: true,
      round: 1,
      maxVolume: 0,
      plantWaterLevel: 0,
      plantSpring: false,
      buttonCooldown: true,
      val: 0,
      quality: 0
    })
    await storeData('@cooldown',Date.now().toString())
    this.props.navigation.setParams({ 
      drawerLockMode: 'unlocked' });
    sendLocalNotification();
  }
    render() {
      let flow = this.state.quality;
      return (
        <View>
          {/* 
            Header material
            Everything labeled with Copilot gets shown during the tutorial walkthrough 
          */}
          <MyHeader activeIcon={this.state.showButton} navigation={this.props.navigation} title="Home" money={this.state.money.toString()}/>
          <ScrollView contentContainerStyle={styles.container}>
          <CopilotStep text="Welcome to SpiroGarden!" order={1} name="welcome">
            <CopilotView/>
          </CopilotStep> 
          {/* Uses absolute positioning since I couldn't figure out how to make the header "walkthroughable" */}
          <CopilotStep text="SpiroGarden let's you take care of your very own virtual plant with your spirometer!" order={2} name="connect">
            <CopilotView style={styles.hamburger}/> 
          </CopilotStep>
          <CopilotStep text="But first, let's press this icon to navigate to the Settings page where you'll set everything up" order={6} name="navigation">
            <CopilotView style={styles.hamburger}/>
          </CopilotStep>

          {/* 
            Titles near top of page
          */}
          { this.state.showPlant && <>
          <CopilotStep text="Check how well you're breathing here! When breathing keep the flow in the middle of the bar and fill the volume bar!" order={4} name="spirometer data">
            <CopilotView>
              <Text style={[styles.subheading, styles.centered]}> Breath: {this.state.round} / {this.state.userBPR}</Text>
              <Text style={styles.heading2}>Flow: {this.state.quality}</Text>
              <Progress.Bar color={flow ? hsl(flow <= 50 ? flow*2 : 100 - (flow - 50)*2, '100%', '50%') : '#3a5335'} progress={flow ? flow/100 : 0} width={300} />
              <Text style={styles.heading2}>Volume: {this.state.val} / {this.state.userVolume} ml</Text>
              <Progress.Bar color={'#3a5335'} progress={this.state.val ? this.state.val/ this.state.userVolume : 0} width={300} />
            </CopilotView>
          </CopilotStep>

          {/*
            Plant Image and CountDowns
          */}
          <Plant plantType={this.state.plantType} plantState={this.state.plantLevel} plantWaterState={this.state.plantWaterLevel} plantSpring={this.state.plantSpring}/>
          <CopilotStep text="Here's where you can check your plant progress! Once the bar is full your plant will grow!" order={3} name="plant">
            <CopilotView>
              <Text style={styles.nextPlantTitle}>Next Plant</Text>
              <Progress.Bar color={'#3a5335'} progress={this.state.plantprogress ? this.state.plantprogress/200 : 0} width={300} />
            </CopilotView>
          </CopilotStep>
          </>
          }
          { !this.state.showPlant && 
              <CountDown
                  until={this.state.timer}
                  size={30}
                  onFinish={() => this.setState({timer: 6})}
                  digitStyle={{backgroundColor: '#3a5335'}}
                  digitTxtStyle={{color: '#FFF'}}
                  timeToShow={['S']}
                  timeLabels={{s: 'Hold Your Breath'}}
                  timeLabelStyle={styles.titlemedium}
                  running={!this.state.showPlant}
              /> }
          {this.state.showButton && (
            <CopilotStep text="Once you connect your spirometer and input your breathing regimen, press Start and begin breathing!" order={5} name="start">
              <CopilotView style={styles.centered}>
                <Button
                  title="START GAME"
                  buttonStyle={styles.button}
                  onPress={this.play10Times}
                  disabled={this.state.buttonCooldown}
                  />

              {this.state.buttonCooldown && <Text style={styles.heading2}> Please wait an hour before watering again! </Text> }
              <View style={styles.buttoncontainer}>
                <Button
                  title='RESET'
                  buttonStyle={styles.button}
                  onPress={this.Quickreset}
                 />
                 <Button
                   title = 'PICK FLOWER'
                   buttonStyle={styles.button}
                   onPress={this.Sellplant}
                   disabled={this.state.plantLevel != 4}
                 />
                </View>
              </CopilotView>
            </CopilotStep>
          )}
          </ScrollView>
        </View>
      );
    }
  }

export default withNavigationFocus(copilot({
    verticalOffset: 25,
  })(HomeScreen));
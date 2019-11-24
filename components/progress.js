import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  SegmentedControlIOS,
} from "react-native"
import SegmentedControlTab from "react-native-segmented-control-tab";
import ProgressCircle from 'react-native-progress-circle'
import { copilot, walkthroughable, CopilotStep } from 'react-native-copilot';
import MyHeader from './MyHeader';
import styles from './styles';
import {getDailyRounds, getMonthlyRounds, getWeeklyRounds} from './dbGateway';
import { getData, storeData } from './gameFunctions';
import moment from "moment";
import { withNavigationFocus } from 'react-navigation';
import RecentRounds from './RecentRounds';

// For the tutorial when the user first loads the page
const CopilotView = walkthroughable(View);

class progress extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
      dailyRounds: 0,
      weeklyRounds: 0,
      monthlyRounds: 0,
      progress: 0
    };
    this.fetchRoundData = this.fetchRoundData.bind(this);
    this.fetchUserData = this.fetchUserData.bind(this);
  }

  // TODO: need to fetch the round data every time the page is loaded
  async componentDidMount() {
    let progress_intro = await getData('@progress_tutorial');
    if (progress_intro === '-1') {
      this.props.start(); // runs the tutorial
      await storeData('@progress_tutorial', '1');
    }
    await this.fetchRoundData();
    await this.fetchUserData();
  }

  async fetchUserData() {
    let rpdGoal = await getData('@userRPD');
    rpdGoal = parseInt(rpdGoal);
    let progress = (this.state.dailyRounds / rpdGoal) * 100;
    this.setState({
      rpdGoal: rpdGoal,
      progress: progress
    });
  }

  async fetchRoundData() {
    let dailyRounds = await getDailyRounds();
    let weeklyRounds = await getWeeklyRounds();
    let monthlyRounds = await getMonthlyRounds();
    if (weeklyRounds > 7) {
      weeklyRounds = 7
    }
    if (monthlyRounds > moment().daysInMonth()) {
      monthlyRounds = moment().daysInMonth();
    }
    this.setState({
      dailyRounds: dailyRounds,
      weeklyRounds: weeklyRounds,
      monthlyRounds: monthlyRounds
    });
  }

  handleIndexChange = index => {
    this.setState({
      ...this.state,
      selectedIndex: index
    });
  }
  render () {
    const options = [
      "DAY",
      "WEEK",
      "MONTH",
      "RECENT"
    ];

    return (
      <View>  
        <MyHeader navigation={this.props.navigation} title="Progress"/>
        <View style={styles.container}> 
          <CopilotStep text="Toggle between Day, Week, and Month Views by pressing the tabs!" order={3} name="hello">
            <CopilotView style={styles.hamburger}/>
          </CopilotStep>
          <SegmentedControlTab
            values={ options }  
            selectedIndex={ this.state.selectedIndex }
            onTabPress={this.handleIndexChange}
            activeTabStyle={styles.activeTab}
            tabStyle={styles.tab}
            tabTextStyle={styles.tabText}
          />
          
          {this.state.selectedIndex === 0 && (
            <View style={styles.container}>
              <View style={{paddingTop: 30}}>
                <ProgressCircle
                percent={this.state.progress}
                radius={75}
                borderWidth={10}
                color='#3a5335'
                shadowColor='#fff'
                bgColor='#87a08b'
                >
                  <Text style={{fontSize: 72, color: '#fff', fontFamily: "LIONELLORegular"}}>{this.state.dailyRounds}</Text>
                </ProgressCircle>
              </View>
              <CopilotStep text="Here's your goal for today!" order={1} name="goal">
                <CopilotView style={styles.centered}>
                  <Text style={styles.titlelarge}>GOAL:</Text>
                  <Text style={styles.titlemedium}>{this.state.rpdGoal} rounds per day</Text>
                </CopilotView>
              </CopilotStep>
              <CopilotStep text="Here's your progress so far!" order={2} name="progress">
                <CopilotView style={styles.centered}>
                  <Text style={styles.subheading}>You have completed </Text> 
                  <Text style={styles.titlemedium}>{this.state.dailyRounds}/{this.state.rpdGoal} </Text>
                  <Text style={styles.subheading}>treatments today</Text>
                </CopilotView>
              </CopilotStep>
            </View>
          )}
          {this.state.selectedIndex === 1 && (
            <View style={styles.container}>
              <View style={{paddingTop: 30}}>
              <ProgressCircle
              percent={(this.state.weeklyRounds / 7) * 100}
              radius={75}
              borderWidth={10}
              color='#3a5335'
              shadowColor='#fff'
              bgColor='#87a08b'
              >
                <Text style={{fontSize: 48, color: '#fff'}}>{this.state.weeklyRounds}</Text>
              </ProgressCircle>
            </View>
            <Text style={styles.titlelarge}>GOAL:</Text>
            <Text style={styles.heading2}>{this.state.rpdGoal} rounds per day for 7 days this week</Text>
            <Text style={styles.subheading}>You have completed </Text> 
          <Text style={styles.titlemedium}>{this.state.weeklyRounds}/7</Text>
            <Text style={styles.subheading}>days of treatment this week</Text>
          </View>
          )}
          {this.state.selectedIndex === 2 && (
            <View style={styles.container}>
              <View style={{paddingTop: 30}}>
              <ProgressCircle
              percent={(this.state.monthlyRounds / moment().daysInMonth()) * 100}
              radius={75}
              borderWidth={10}
              color='#3a5335'
              shadowColor='#fff'
              bgColor='#87a08b'
              >
                <Text style={{fontSize: 48, color: '#fff'}}>{this.state.monthlyRounds}</Text>
              </ProgressCircle>
            </View>
            <Text style={styles.titlelarge}>GOAL:</Text>
            <Text style={styles.heading2}>{this.state.rpdGoal} rounds a day for {moment().daysInMonth()} days this month</Text>
            <Text style={styles.subheading}>You have completed </Text> 
            <Text style={styles.titlemedium}>{this.state.monthlyRounds}/{moment().daysInMonth()}</Text>
            <Text style={styles.subheading}>days of treatment this month</Text>
          </View>
          )}
        {this.state.selectedIndex === 3 && (
          <View style={styles.container}>
          <RecentRounds> </RecentRounds>
          </View>
        )}
        </View>
      </View>
      
    );
  }

  async componentDidUpdate(prevProps) {
    if (this.props.isFocused && !prevProps.isFocused) {
      // Screen has now come into focus, call your method here 
      await this.fetchRoundData();
      await this.fetchUserData();
      console.log("new data!");
    }
  }
}

export default withNavigationFocus(copilot({
    verticalOffset: 25,
  })(progress));

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
import moment from "moment";

// For the tutorial when the user first loads the page
const CopilotView = walkthroughable(View);

class progress extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
      dailyRounds: 0,
      weeklyRounds: 0,
      monthlyRounds: 0
    };
  }

  // TODO: need to fetch the round data every time the page is loaded
  async componentDidMount() {
    this.props.start(); // runs the tutorial
    let dailyRounds = await getDailyRounds();
    let weeklyRounds = await getWeeklyRounds();
    let monthlyRounds = await getMonthlyRounds();
    if (dailyRounds > 3) {
      dailyRounds = 3;
    }
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
      "MONTH"
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
              <View style={{marginTop: 75}}>
                <ProgressCircle
                percent={(this.state.dailyRounds / 3) * 100}
                radius={75}
                borderWidth={10}
                color='#229637'
                shadowColor='#fff'
                bgColor='#8BD398'
                
                >
                  <Text style={{fontSize: 72, color: '#fff', fontFamily: "LIONELLORegular"}}>{this.state.dailyRounds}</Text>
                </ProgressCircle>
              </View>
              <CopilotStep text="Here's your goal for today!" order={1} name="goal">
                <CopilotView style={styles.centered}>
                  <Text style={styles.titlelarge}>GOAL:</Text>
                  <Text style={styles.titlemedium}>3 rounds per day</Text>
                </CopilotView>
              </CopilotStep>
              <CopilotStep text="Here's your progress so far!" order={2} name="progress">
                <CopilotView style={styles.centered}>
                  <Text style={styles.subheading}>You have completed </Text> 
                  <Text style={styles.titlemedium}>{this.state.dailyRounds}/3</Text>
                  <Text style={styles.subheading}>treatments today</Text>
                </CopilotView>
              </CopilotStep>
            </View>
          )}
          {this.state.selectedIndex === 1 && (
            <View style={styles.container}>
              <View style={{marginTop: 75}}>
              <ProgressCircle
              percent={(this.state.weeklyRounds / 7) * 100}
              radius={75}
              borderWidth={10}
              color='#229637'
              shadowColor='#fff'
              bgColor='#8BD398'
              >
                <Text style={{fontSize: 48, color: '#fff'}}>{this.state.weeklyRounds}</Text>
              </ProgressCircle>
            </View>
            <Text style={styles.titlelarge}>GOAL:</Text>
            <Text style={styles.heading2}>3 rounds per day for 7 days this week</Text>
            <Text style={styles.subheading}>You have completed </Text> 
          <Text style={styles.titlemedium}>{this.state.weeklyRounds}/7</Text>
            <Text style={styles.subheading}>days of treatment this week</Text>
          </View>
          )}
          {this.state.selectedIndex === 2 && (
            <View style={styles.container}>
              <View style={{marginTop: 75}}>
              <ProgressCircle
              percent={(this.state.monthlyRounds / moment().daysInMonth()) * 100}
              radius={75}
              borderWidth={10}
              color='#229637'
              shadowColor='#fff'
              bgColor='#8BD398'
              >
                <Text style={{fontSize: 48, color: '#fff'}}>{this.state.monthlyRounds}</Text>
              </ProgressCircle>
            </View>
            <Text style={styles.titlelarge}>GOAL:</Text>
            <Text style={styles.heading2}>3 rounds a day for {moment().daysInMonth()} days this month</Text>
            <Text style={styles.subheading}>You have completed </Text> 
            <Text style={styles.titlemedium}>{this.state.monthlyRounds}/{moment().daysInMonth()}</Text>
            <Text style={styles.subheading}>days of treatment this month</Text>
          </View>
          )}
        </View>
      </View>
      
    );
  }
}

export default copilot({
    verticalOffset: 25,
  })(progress);

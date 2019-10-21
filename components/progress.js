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
import MyHeader from './MyHeader';
import styles from './styles';

export default class progress extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0
    };
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
              <ProgressCircle
              percent={66}
              radius={75}
              borderWidth={10}
              color='#229637'
              shadowColor='#fff'
              bgColor='#8BD398'
              >
                <Text style={{fontSize: 48, color: '#fff'}}>{'2'}</Text>
              </ProgressCircle>
              <Text style={{fontSize: 32}}>GOAL:</Text>
              <Text style={{fontSize: 24}}>3 rounds per day</Text>
              <Text>You have completed 2/3 treatments today</Text>
            </View>
          )}
          {this.state.selectedIndex === 1 && (
            <View style={styles.container}>
            <ProgressCircle
            percent={57}
            radius={75}
            borderWidth={10}
            color='#229637'
            shadowColor='#fff'
            bgColor='#8BD398'
            >
              <Text style={{fontSize: 48, color: '#fff'}}>{'4'}</Text>
            </ProgressCircle>
            <Text style={{fontSize: 32}}>GOAL:</Text>
            <Text style={{fontSize: 24}}>3 rounds per day for 7 days this week</Text>
            <Text>You have completed 4/7 days of treatment this week</Text>
          </View>
          )}
          {this.state.selectedIndex === 2 && (
            <View style={styles.container}>
            <ProgressCircle
            percent={65}
            radius={75}
            borderWidth={10}
            color='#229637'
            shadowColor='#fff'
            bgColor='#8BD398'
            >
              <Text style={{fontSize: 48, color: '#fff'}}>{'20'}</Text>
            </ProgressCircle>
            <Text style={{fontSize: 32}}>GOAL:</Text>
            <Text style={{fontSize: 24}}>3 rounds a day for 31 days this month</Text>
            <Text>You have completed 20/31 days of treatment this month</Text>
          </View>
          )}
        </View>
      </View>
      
    );
  }
}

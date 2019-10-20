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
import { threadId } from "worker_threads";

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
    if (this.state.selectedIndex == 0) {
      return (
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
      )
    }
    if (this.state.selectedIndex == 1) {
      alert("This is your weekly progress")
    }
    if (this.state.selectedIndex== 2) {
      alert("This is your monthly progress")
    }
  }
  render () {
    const options = [
      "Day",
      "Week",
      "Month"
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
            tabTextStyle={threadId.tabText}
          />
        </View>
      </View>
      
    );
  }
}

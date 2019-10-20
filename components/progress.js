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
    if (this.state.selectedIndex == 0) {
      return (
        <View style={styles.container}>
          <ProgressCircle
            percent={100}
            radius={75}
            borderWidth={10}
            color='#229637'
            shadowColor='#fff'
            bgColor='8BD398'
            >
              <Text style={{fontSize: 24}}>{'100%'}</Text>
            </ProgressCircle>
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
          />
        </View>
      </View>
      
    );
  }
}

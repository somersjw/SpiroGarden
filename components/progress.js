import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  SegmentedControlIOS,
} from "react-native"
import { SegmentedControls } from 'react-native-radio-buttons';
import MyHeader from './MyHeader';

export default class progress extends React.Component {
  render () {
    const options = [
      "Day",
      "Week",
      "Month"
    ];

    function setSelectedOption(selectedOption) {
      this.setState({
        selectedOption
      });
    }  
  
    function renderContainer(optionNodes){
      return <View>{optionNodes}</View>;
    }


    return (
      <View>  
        <MyHeader navigation={this.props.navigation} title="Progress"/>
        <View style={{margin: 20}}> 
          <SegmentedControls 
            options={ options }  
            onSelection={ setSelectedOption.bind(this) }
            selectedOption={ this.state.selectedOption }
            optionContainerStyle={{flex: 1}}
          />
        </View>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'center',
   marginTop: 20,
  },

  button: {
    backgroundColor: '#229637',
  }
});
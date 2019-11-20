import React from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import MyHeader from './MyHeader';
import styles from './styles';
import sendLocalNotification from './notifications';
import { copilot, walkthroughable, CopilotStep } from 'react-native-copilot';

// For the tutorial when the user first loads the page
const CopilotView = walkthroughable(View);

class Settings extends React.Component {
  state = {
    breathsPerRound: 0,
    roundsPerDay: 0
  }

  handleBPR = (num) => {
    this.setState({breathsPerRound: num})
  }
  handleRPD = (num) => {
    this.setState({roundsPerDay: num})
  }
    componentDidMount() {
      this.props.start(); // runs the tutorial
    }
    _onPressUpdate() {
        alert('You have successfully updated your regiment')
        console.log('still need to set async storage or something here?')
    }
    render (){
        return (
            <View>
                <MyHeader navigation={this.props.navigation} title="Settings"/>
                <View style={styles.container}>
                    <CopilotStep text="Connect your Spirometer here!" order={1} name="setup">
                      <CopilotView>
                        <Text style={styles.titlelarge}>Set Up Device</Text>
                        <Button title="Connect" onPress={sendLocalNotification} color="#229637"/>
                      </CopilotView>
                    </CopilotStep>
                    <CopilotStep text="Update your breathing regimen here! Make sure you have doctor approval first" order={2} name="regimen">
                      <CopilotView>
                        <Text style={styles.titlelarge}>Breathing Regimen</Text>
                        <TextInput style = {styles.regimen}
                          placeholder = "Enter prescribed breaths per round"
                          onChangeText = {this.handleBPR}/>
                        <TextInput style = {styles.regimen}
                          placeholder = "Enter prescribed rounds per day"
                          onChangeText = {this.handleRPD}/>
                        <Button title="Update" onPress={this._onPressUpdate} color="#229637"/>
                      </CopilotView>
                    </CopilotStep>
                </View>
            </View>
        );
      }
}

export default copilot({
    verticalOffset: 25,
  })(Settings);
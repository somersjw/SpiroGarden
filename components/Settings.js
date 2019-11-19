import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import MyHeader from './MyHeader';
import styles from './styles';
import sendLocalNotification from './notifications';
import { copilot, walkthroughable, CopilotStep } from 'react-native-copilot';
import {getDailyRounds} from './dbGateway';

// For the tutorial when the user first loads the page
const CopilotView = walkthroughable(View);

class Settings extends React.Component {
    componentDidMount() {
      this.props.start(); // runs the tutorial
    }
    _onPressUpdate() {
        alert('You have successfully updated your regiment')
    }

    test() {
        console.log(getDailyRounds());
    }
    render (){
        return (
            <View>
                <MyHeader navigation={this.props.navigation} title="Settings"/>
                <View style={styles.container}>
                    <CopilotStep text="Connect your Spirometer here!" order={1} name="setup">
                      <CopilotView>
                        <Text style={styles.titlelarge}>Set Up Device</Text>
                        <Button title="Connect" onPress={this.test} color="#229637"/>
                      </CopilotView>
                    </CopilotStep>
                    <CopilotStep text="Update your breathing regimen here! Make sure you have doctor approval first" order={2} name="regimen">
                      <CopilotView>
                        <Text style={styles.titlelarge}>Breathing Regimen</Text>
                        <Text style={styles.heading2}>10 breaths per round</Text>
                        <Text style={styles.heading2}>3 rounds per day</Text>
                        <Text style={styles.heading2}>15 days</Text>
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
import React from "react";
import { View, Text, Keyboard, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import MyHeader from './MyHeader';
import styles from './styles';
import { Button } from 'react-native-elements';
import sendLocalNotification from './notifications';
import { copilot, walkthroughable, CopilotStep } from 'react-native-copilot';
import {getDailyRounds} from './dbGateway';
import { getData, storeData } from './gameFunctions';

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
    async componentDidMount() {
      let settings_intro = await getData('@settings_tutorial');
      if (settings_intro === '-1') {
        this.props.start(); // runs the tutorial
        await storeData('@settings_tutorial', '1');
      }
    }
    _onPressUpdate() {
        alert('You have successfully updated your regiment')
        console.log('still need to set async storage or something here?')
    }

    test() {
        console.log(getDailyRounds());
    }
    render (){
        return (
            <View style={styles.container}>
                <MyHeader navigation={this.props.navigation} title="Settings"/>
                    <CopilotStep text="Update your breathing regimen here! Make sure you have doctor approval first" order={2} name="regimen">
                      <CopilotView>
                        <Text style={styles.titlelarge}>Breathing Regimen</Text>
                        <TextInput style = {styles.regimen}
                          keyboardType="numeric"
                          placeholder = "Enter prescribed breaths per round"
                          placeholderTextColor="#3a5335"
                          onChangeText = {this.handleBPR}
                        />
                        <TextInput style = {styles.regimen}
                          keyboardType="numeric"
                          placeholder = "Enter prescribed rounds per day"
                          placeholderTextColor="#3a5335"
                          onChangeText = {this.handleRPD}/>
                        <View style={styles.centered}>
                          <Button
                            title="UPDATE"
                            onPress={this._onPressUpdate}
                            buttonStyle={styles.button}/>
                        </View>
                      </CopilotView>
                    </CopilotStep>
                    <CopilotStep text="Connect your Spirometer here!" order={1} name="setup">
                      <CopilotView style={styles.centered}>
                        <Text style={styles.titlelarge}>Set Up Device</Text>
                        <Button
                          title="CONNECT"
                          onPress={this.test}
                          buttonStyle={styles.button}/>
                      </CopilotView>
                    </CopilotStep>
            </View>
        );
      }
}

export default copilot({
    verticalOffset: 25,
  })(Settings);
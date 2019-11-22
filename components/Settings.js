import React from "react";
import { View, Text, Button, StyleSheet, TextInput, KeyboardAvoidingView } from "react-native";
import MyHeader from './MyHeader';
import styles from './styles';
import sendLocalNotification from './notifications';
import { copilot, walkthroughable, CopilotStep } from 'react-native-copilot';
import {getDailyRounds} from './dbGateway';
import { storeData } from "./gameFunctions";

// For the tutorial when the user first loads the page
const CopilotView = walkthroughable(View);

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      BPR: null,
      RPD: null,
      volume: null
    }
    this._onPressUpdate = this._onPressUpdate.bind(this);
  }

    componentDidMount() {
      this.props.start(); // runs the tutorial
    }
    async _onPressUpdate() {
      if (this.state.RPD) {
        await storeData('@userRPD', this.state.RPD.toString());
      }

      if (this.state.BPR) {
        await storeData('@userBPR', this.state.BPR.toString());
      }

      if (this.state.volume) {
        await storeData('@userVolume', this.state.volume.toString());
      }
      this.setState({
        BPR: "",
        RPD: "",
        volume: ""
      });

      alert("Your regimen has been updated");
    }

    test() {
        console.log(getDailyRounds());
    }
    render (){
        return (
            <View>
                <MyHeader navigation={this.props.navigation} title="Settings"/>
                <KeyboardAvoidingView style={styles.container} behavior="padding">
                    <CopilotStep text="Connect your Spirometer here!" order={1} name="setup">
                      <CopilotView>
                        <Text style={styles.titlelarge}>Set Up Device</Text>
                        <Button title="Connect" onPress={this.test} color="#229637"/>
                      </CopilotView>
                    </CopilotStep>
                    <CopilotStep text="Update your breathing regimen here! Make sure you have doctor approval first" order={2} name="regimen">
                      <CopilotView>
                        <Text style={styles.titlelarge}>Breathing Regimen</Text>
                        <TextInput style = {styles.regimen}
                          value = {this.state.BPR}
                          keyboardType="numeric"
                          placeholder = "Enter prescribed breaths per round"
                          onChangeText = {(BPR) => this.setState({BPR})}
                        />
                        <TextInput style = {styles.regimen}
                          value = {this.state.RPD}
                          keyboardType="numeric"
                          placeholder = "Enter prescribed rounds per day"
                          onChangeText = {(RPD) => this.setState({RPD})}/>

                      <TextInput style = {styles.regimen}
                          value = {this.state.volume}
                          keyboardType="numeric"
                          placeholder = "Enter target volume goal"
                          onChangeText = {(volume) => this.setState({volume})}/>
                        <Button title="Update" onPress={this._onPressUpdate} disabled={!(this.state.BPR || this.state.RPD || this.state.volume)} color="#229637"/>
                      </CopilotView>
                    </CopilotStep>
                </KeyboardAvoidingView>
            </View>
        );
      }
}

export default copilot({
    verticalOffset: 25,
  })(Settings);
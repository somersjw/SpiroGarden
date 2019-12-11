import React from "react";
import { ScrollView, View, Text, TextInput, Alert } from "react-native";
import MyHeader from './MyHeader';
import styles from './styles';
import { Button } from 'react-native-elements';
import { copilot, walkthroughable, CopilotStep } from 'react-native-copilot';
import {getDailyRounds} from './dbGateway';
import { getData, storeData } from './gameFunctions';
import { sendLocalNotification } from "./notifications";


// For the tutorial when the user first loads the page
const CopilotView = walkthroughable(View);

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      BPR: "",
      RPD: "",
      volume: "",
      formIsValid: false
    }
    this._onPressUpdate = this._onPressUpdate.bind(this);
    this.checkValid = this.checkValid.bind(this);
  }

    async componentDidMount() {
      let settings_intro = await getData('@settings_tutorial');
      if (settings_intro === '-1') {
        this.props.start(); // runs the tutorial
        await storeData('@settings_tutorial', '1');
      }
    }

    checkValid() {
      if (!(this.state.BPR || this.state.RPD || this.state.volume)) {
        return "Please fill out at least one field to update";
      }
      if (this.state.BPR && this.state.BPR < 1) {
        return "Please input a valid breaths per round (More than 0)";
      }

      if (this.state.RPD && (this.state.RPD < 1 || this.state.RPD > 24)) {
        return "Please input a valid rounds per day (Between 1-24)";
      }

      if (this.state.volume && (this.state.volume < 100 || this.state.volume > 2500)) {
        return "Please input a valid target volume (Between 100-2500)";
      }

      return "OK";
    }

    async _onPressUpdate() {
      let status = this.checkValid();
      if (status === "OK") {
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
        volume: "",
        formIsValid: false
        });
        Alert.alert("Success", "Your regimen has been updated.");
      }
      else {
        Alert.alert("Error", status);
      }
    }

    test() {
      sendLocalNotification();
      // storeData('@plant_type', '2');
    }
    render (){
        return (
          <View>
            <MyHeader activeIcon={true} navigation={this.props.navigation} title="Settings"/>
            <ScrollView contentContainerStyle={styles.container}>
                    <CopilotStep text="Update your breathing regimen here! Make sure you have doctor approval first" order={2} name="regimen">
                      <CopilotView>
                        <Text style={[styles.titlemedium, styles.centered]}>Breathing Regimen</Text>
                        <TextInput style = {styles.regimen}
                          value = {this.state.BPR}
                          keyboardType="numeric"
                          returnKeyType="done"
                          placeholder = "Enter prescribed breaths per round"
                          onChangeText = {(BPR) => {this.setState({BPR}); this.checkValid();}}
                          placeholderTextColor="#3a5335"
                        />
                        <TextInput style = {styles.regimen}
                          value = {this.state.RPD}
                          keyboardType="numeric"
                          returnKeyType="done"
                          placeholder = "Enter prescribed rounds per day"
                          placeholderTextColor="#3a5335"
                          onChangeText = {(RPD) => {this.setState({RPD}); this.checkValid();}}
                          />
                      <TextInput style = {styles.regimen}
                          value={this.state.volume}
                          keyboardType="numeric"
                          returnKeyType="done"
                          placeholder = "Enter target volume goal in mL"
                          onChangeText = {(volume) => {this.setState({volume}); this.checkValid();}}
                          placeholderTextColor="#3a5335"
                          />
                      <View style={styles.centered}>
                        <Button
                          title="UPDATE"
                          onPress={this._onPressUpdate}
                          disabled={!(this.state.BPR || this.state.RPD || this.state.volume)}
                          buttonStyle={styles.button}/>
                      </View>
                      </CopilotView>
                    </CopilotStep>
                    <CopilotStep text="Connect your Spirometer here!" order={1} name="setup">
                      <CopilotView style={styles.centered}>
                        <Text style={[styles.titlemedium, styles.paddingTop]}>Set Up Device</Text>
                        <Button
                          title="CONNECT"
                          onPress={this.test}
                          buttonStyle={styles.button}/>
                      </CopilotView>
                    </CopilotStep>
            </ScrollView>
          </View>
        );
      }
}

export default copilot({
    verticalOffset: 25,
  })(Settings);
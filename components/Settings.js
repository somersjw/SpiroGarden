import React from "react";
import { ScrollView, View, Text, Keyboard, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
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
  constructor() {
    super();
    this.state = {
      BPR: null,
      RPD: null,
      volume: null
    }
    this._onPressUpdate = this._onPressUpdate.bind(this);
  }

    async componentDidMount() {
      let settings_intro = await getData('@settings_tutorial');
      if (settings_intro === '-1') {
        this.props.start(); // runs the tutorial
        await storeData('@settings_tutorial', '1');
      }
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
            <ScrollView contentContainerStyle={styles.container}>
                    <CopilotStep text="Update your breathing regimen here! Make sure you have doctor approval first" order={2} name="regimen">
                      <CopilotView>
                        <Text style={styles.titlelarge}>Breathing Regimen</Text>
                        <TextInput style = {styles.regimen}
                          value = {this.state.BPR}
                          keyboardType="numeric"
                          placeholder = "Enter prescribed breaths per round"
                          onChangeText = {(BPR) => this.setState({BPR})}
                          placeholderTextColor="#3a5335"
                        />
                        <TextInput style = {styles.regimen}
                          value = {this.state.RPD}
                          keyboardType="numeric"
                          placeholder = "Enter prescribed rounds per day"
                          placeholderTextColor="#3a5335"
                          onChangeText = {(RPD) => this.setState({RPD})}
                          />
                      <TextInput style = {styles.regimen}
                          value={this.state.volume}
                          keyboardType="numeric"
                          placeholder = "Enter target volume goal in mL"
                          onChangeText = {(volume) => this.setState({volume})}
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
                        <Text style={styles.titlelarge}>Set Up Device</Text>
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
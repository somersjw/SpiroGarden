import React from "react";
import { View, Text, Keyboard, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import MyHeader from './MyHeader';
import styles from './styles';
import { Button } from 'react-native-elements';
import sendLocalNotification from './notifications';
import { copilot, walkthroughable, CopilotStep } from 'react-native-copilot';
import {getDailyRounds} from './dbGateway';
<<<<<<< HEAD
import { storeData } from "./gameFunctions";
=======
import { getData, storeData } from './gameFunctions';
>>>>>>> b5561d261eb3cafcf968ae3250a73543fa16d73a

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
            <View style={styles.container}>
                <MyHeader navigation={this.props.navigation} title="Settings"/>
                    <CopilotStep text="Update your breathing regimen here! Make sure you have doctor approval first" order={2} name="regimen">
                      <CopilotView>
                        <Text style={styles.titlelarge}>Breathing Regimen</Text>
                        <TextInput style = {styles.regimen}
                          value = {this.state.BPR}
                          keyboardType="numeric"
                          placeholder = "Enter prescribed breaths per round"
<<<<<<< HEAD
                          onChangeText = {(BPR) => this.setState({BPR})}
=======
                          placeholderTextColor="#fff"
                          onChangeText = {this.handleBPR}
>>>>>>> b5561d261eb3cafcf968ae3250a73543fa16d73a
                        />
                        <TextInput style = {styles.regimen}
                          value = {this.state.RPD}
                          keyboardType="numeric"
                          placeholder = "Enter prescribed rounds per day"
<<<<<<< HEAD
                          onChangeText = {(RPD) => this.setState({RPD})}/>

                      <TextInput style = {styles.regimen}
                          value = {this.state.volume}
                          keyboardType="numeric"
                          placeholder = "Enter target volume goal"
                          onChangeText = {(volume) => this.setState({volume})}/>
                        <Button title="Update" onPress={this._onPressUpdate} disabled={!(this.state.BPR || this.state.RPD || this.state.volume)} color="#229637"/>
=======
                          placeholderTextColor="#fff"
                          onChangeText = {this.handleRPD}/>
                        <Button
                          title="UPDATE"
                          onPress={this._onPressUpdate}
                          buttonStyle={styles.button}/>
                      </CopilotView>
                    </CopilotStep>
                    <CopilotStep text="Connect your Spirometer here!" order={1} name="setup">
                      <CopilotView>
                        <Text style={styles.titlelarge}>Set Up Device</Text>
                        <Button
                          title="CONNECT"
                          onPress={this.test}
                          buttonStyle={styles.button}/>
>>>>>>> b5561d261eb3cafcf968ae3250a73543fa16d73a
                      </CopilotView>
                    </CopilotStep>
            </View>
        );
      }
}

export default copilot({
    verticalOffset: 25,
  })(Settings);
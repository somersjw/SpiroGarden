import React from "react";
import { ScrollView, View, Text, Keyboard, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import MyHeader from './MyHeader';
import styles from './styles';
import { Button } from 'react-native-elements';
import sendLocalNotification from './notifications';
import { copilot, walkthroughable, CopilotStep } from 'react-native-copilot';
import {getDailyRounds} from './dbGateway';
import { getData, storeData } from './gameFunctions';
import call from 'react-native-phone-call'


// For the tutorial when the user first loads the page
const CopilotView = walkthroughable(View);

class Help extends React.Component {
  constructor() {
    super();
  }

  call(args) {
    call(args).catch(console.error);
  }

  render (){
    const args = {
      // who ya gonna call? TODO: change to actual phone number
      number: 'GHOSTBUSTERS', // String value with the number to call
      prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
    }
    return (
      <View>
        <MyHeader activeIcon={true} navigation={this.props.navigation} title="Help"/>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={[styles.subheading, styles.centered]}>Talk to your doctor for more information</Text>
          <Button
            title="CALL FOR HELP"
            onPress={() => call(args)}
            buttonStyle={styles.widebutton}/>
        </ScrollView>
      </View>
    );
  }
}

export default copilot({
    verticalOffset: 25,
  })(Help);
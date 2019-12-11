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
              <Text style={[styles.titlemedium, styles.centered]}>How to use a Spirometer</Text>
              <Text style={[styles.heading2, styles.centered]}></Text>
              <View style={styles.circularView}>
                <Text style={{color: '#fff', fontSize: 25}}>1</Text>
              </View>
              <Text style={[styles.heading2, styles.centered]}>Put the mouthpiece in your mouth and close your lips tightly around it. Do not block the mouthpiece with your tongue.</Text>
              <View style={{height: 10}}></View>
              <View style={styles.circularView}>
                <Text style={{color: '#fff', fontSize: 25}}>2</Text>
              </View>
              <Text style={[styles.heading2, styles.centered]}>Inhale slowly and deeply through the mouthpiece to raise the indicator. Try to make the indicator rise up to the level of the goal marker.</Text>
              <View style={{height: 10}}></View>
              <View style={styles.circularView}>
                <Text style={{color: '#fff', fontSize: 25}}>3</Text>
              </View>
              <Text style={[styles.heading2, styles.centered]}>When you cannot inhale any longer, remove the mouthpiece and hold your breath for 6 seconds.</Text>
              <View style={{height: 10}}></View>
              <View style={styles.circularView}>
                <Text style={{color: '#fff', fontSize: 25}}>4</Text>
              </View>
              <Text style={[styles.heading2, styles.centered]}>Exhale normally.</Text>
              <Text style={[styles.heading2, styles.centered]}></Text>
              <Text style={[styles.heading2, styles.centered]}></Text>
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
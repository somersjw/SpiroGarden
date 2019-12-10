import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MyHeader from './MyHeader';
import styles from './styles';

export default class Tutorial extends React.Component {
    render (){
        return (
        <View>
         <MyHeader navigation={this.props.navigation} title="Spirometer Tutorial"/>
            <View style={styles.container}>
              <Text style={[styles.titlemedium, styles.centered]}>How to use a Spirometer</Text>
              <Text style={[styles.heading2, styles.centered]}></Text>
              <Text style={[styles.heading2, styles.centered]}>1. Put the mouthpiece in your mouth and close your lips tightly around it. Do not block the mouthpiece with your tongue.</Text>
              <Text style={[styles.heading2, styles.centered]}>2. Inhale slowly and deeply through the mouthpiece to raise the indicator. Try to make the indicator rise up to the level of the goal marker.</Text>
              <Text style={[styles.heading2, styles.centered]}>3. When you cannot inhale any longer, remove the mouthpiece and hold your breath for 6 seconds.</Text>
              <Text style={[styles.heading2, styles.centered]}>4. Exhale normally.</Text>
            </View>
        </View>
        );
      }
}
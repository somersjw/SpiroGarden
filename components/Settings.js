import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import MyHeader from './MyHeader';
import styles from './styles';

export default class Settings extends React.Component {
    _onPressConnect() {
        alert('You have successfully set up your spirometer')
    }
    _onPressUpdate() {
        alert('You have successfully updated your regiment')
    }
    render (){
        return (
            <View>
                <MyHeader navigation={this.props.navigation} title="Settings"/>
                <View style={styles.container}>
                    <Text style={styles.titlelarge}>Set Up Device</Text>
                    <Button title="Connect" onPress={this._onPressConnect} color="#229637"/>
                    <Text style={styles.titlelarge}>Breathing Regiment</Text>
                    <Text style={styles.heading2}>10 breaths per round</Text>
                    <Text style={styles.heading2}>3 rounds per day</Text>
                    <Text style={styles.heading2}>15 days</Text>
                    <Button title="Update" onPress={this._onPressUpdate} color="#229637"/>
                </View>
            </View>
        );
      }
}
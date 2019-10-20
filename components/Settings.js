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
                    <Text>Set Up Device</Text>
                    <Button title="Connect" onPress={this._onPressConnect} buttonStyle={styles.button}/>
                    <Text>Breathing Regiment</Text>
                    <Text>10 breaths per round</Text>
                    <Text>3 rounds per day</Text>
                    <Text>15 days</Text>
                    <Button title="Update" onPress={this._onPressUpdate} buttonStyle={styles.button}/>
                </View>
            </View>
        );
      }
}
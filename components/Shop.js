import React from "react";
import { View, Text, Image, Animated, ScrollView } from "react-native";
import MyHeader from './MyHeader';
import styles from './styles';
import { Button } from 'react-native-elements';
import { AsyncAlert, fetchSpiroData, getData, storeData, changePlant, initializePlant , saveprogress, round , getdatmoney, sleep, fetchHardwareData} from './gameFunctions';

export default class Shop extends React.Component {

  constructor() {
    super();
    this.state = {money: 0}
    this.buyItem
  }
  async componentDidMount() {
    let money = await getdatmoney(0);
    this.setState({
      money: money
    });
    }

    render (){
        return (
        <View style={{flex: 1}}>
         <MyHeader activeIcon={true} navigation={this.props.navigation} title="Shop" />
            <View style={styles.container}>
              <Text style={[styles.titlemedium, styles.centered]}>Welcome to the Shop!</Text>
              <Text style={[styles.heading3, styles.centered]}>Your money is: ${this.state.money}</Text>

              <Animated.Image
                style={{
                  width: '30%',
                  height: '30%',
                }}
                source={require('../assets/plant-medium.gif')}
            />
            <Button
              title="Buy for $1000"
              onPress={this.buyitem}
              buttonStyle={styles.button}
              disabled={this.state.money < 1000}
            />

            <Animated.Image
                style={{
                  width: '30%',
                  height: '30%',
                }}
                source={require('../assets/plant2-medium.gif')}
            />
            <Button
              title="Buy for $1000"
              onPress={this.buyitem}
              buttonStyle={styles.button}
              disabled={this.state.money < 1000}
            />
            </View>
        </View>
        );
      }
}
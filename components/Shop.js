import React from "react";
import { View, Text, Image, Animated, ScrollView } from "react-native";
import MyHeader from './MyHeader';
import styles from './styles';
import { Button } from 'react-native-elements';
import { withNavigationFocus } from 'react-navigation';
import { AsyncAlert, fetchSpiroData, getData, storeData, changePlant, initializePlant , saveprogress, round , getdatmoney, sleep, fetchHardwareData} from './gameFunctions';

class Shop extends React.Component {

  constructor() {
    super();
    this.state = {money: 0, plantType: 1};
    this.buyitem = this.buyitem.bind(this);
  }

  async componentDidMount() {
    let money = await getdatmoney(0);
    let plantType = parseInt(await getData('@plant_type'));
    this.setState({
      money: money,
      plantType: plantType
    });
    }

  async componentDidUpdate(prevProps) {
    if (this.props.isFocused && !prevProps.isFocused) {
      // Screen has now come into focus, call your method here
      let money = await getdatmoney(0);
      this.setState({
        money: money
      });
    }
  }

  async buyitem(cost, itemNo){
    let money = await getdatmoney(0 - cost);
    storeData('@plant_type', itemNo);
    after = money;
    this.setState({
      money: after,
      plantType: itemNo
    });
  }

    render (){
        return (
        <View style={{flex: 1}}>
         <MyHeader activeIcon={true} navigation={this.props.navigation} title="Shop" />
            <View style={styles.container}>
              <Text style={[styles.titlemedium, styles.centered]}>Welcome to the Shop!</Text>
              <Text style={[styles.heading3, styles.centered]}>You have: ${this.state.money}</Text>

              <Animated.Image
                style={{
                  width: '30%',
                  height: '30%',
                }}
                source={require('../assets/plant-medium.gif')}
            />
            <Button
              title="Buy for $500"
              onPress={ ()=> this.buyitem(500, '1')}
              buttonStyle={styles.button}
              disabled={this.state.money < 500 || this.state.plantType == 1}
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
              onPress={ ()=> this.buyitem(1000, '2')}
              buttonStyle={styles.button}
              disabled={this.state.money < 1000 || this.state.plantType == 2}
            />
            </View>
        </View>
        );
      }
}

export default withNavigationFocus((Shop));
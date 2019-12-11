import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MyHeader from './MyHeader';
import styles from './styles';
import { Button } from 'react-native-elements';
import { withNavigationFocus } from 'react-navigation';
import { AsyncAlert, fetchSpiroData, getData, storeData, changePlant, initializePlant , saveprogress, round , getdatmoney, sleep, fetchHardwareData} from './gameFunctions';

class Shop extends React.Component {


  constructor() {
    super();
    this.state = {money: 0};
    this.buyitem = this.buyitem.bind(this);
  }
  async componentDidMount() {
    let money = await getdatmoney(0);
    this.setState({
      money: money
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
    after = money;
    this.setState({
      money: after
    });
  }

    render (){
        return (
        <View>
         <MyHeader activeIcon={true} navigation={this.props.navigation} title="Shop" />
            <View style={styles.container}>
              <Text style={[styles.titlemedium, styles.centered]}>Welcome to the Shop!</Text>
              <Text style={[styles.heading3, styles.centered]}>Your money is: ${this.state.money}</Text>
               <Button
                 title="Buy for $1000"
                 buttonStyle={styles.button}
                 onPress={ ()=> this.buyitem(1000, 1)}
                 disabled={this.state.money < 1000}
               />
            </View>
        </View>
        );
      }
}

export default withNavigationFocus((Shop));
import React from 'react';
import { Button, Text, View, FlatList } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount(){
    return fetch('http://67.205.163.230', {header: {
      'Content-Type': 'application/json'}
    })
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          quality: responseJson.quality,
          val: responseJson.val
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* <Text> Quality: {this.state.quality} Val: {this.state.val}</Text> */}
        <Button
        title="Hamburger Menu"
        onPress={() => this.props.navigation.toggleDrawer()}
      />
      </View>
      );
    }
  }
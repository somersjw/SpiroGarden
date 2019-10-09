import React from 'react';
import { Button, Text, View, FlatList } from 'react-native';
import MyHeader from './MyHeader';

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
        <View>
        <MyHeader navigation={this.props.navigation} title="Home" />
        <Text> Current Spriometer Values</Text>
        <Text> Quality: {this.state.quality} Val: {this.state.val}</Text>
      </View>
      );
    }
  }
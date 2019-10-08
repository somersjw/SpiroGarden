import React from 'react';
import { StyleSheet, Text, ScrollView, FlatList } from 'react-native';


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
        <Text> Quality: {this.state.quality} Val: {this.state.val}</Text>
      );
    }
  }
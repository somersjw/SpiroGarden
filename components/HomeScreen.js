import React from 'react';
import { StyleSheet, Text, ScrollView, FlatList } from 'react-native';


export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount(){
    return fetch('http://67.205.163.230:5000')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          data: data
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }
    render() {
      return (
        <Text> {this.state.data} </Text>
      );
    }
  }
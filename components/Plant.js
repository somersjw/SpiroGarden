import React, { Component } from 'react';
import { View, Image } from 'react-native';
import styles from './styles';

export default class Plant extends Component {
  render() {
    return (
      <Image
        style={styles.image}
        source={require('../assets/plant-dirt.png')}
      />
    );
  }
}
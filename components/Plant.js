import React, { Component } from 'react';
import { View, Image } from 'react-native';
import styles from './styles';

export default class Plant extends Component {
  render() {
    const IMAGES = {
      image0: require('../assets/plant-dead.png'),
      image1: require('../assets/plant-dirt-water.gif'),
      image2: require('../assets/plant-small.png'),
      image3: require('../assets/plant-medium.png'),
      image4: require('../assets/plant-large.png'),
    }
    const plantURL = IMAGES['image' + this.props.plantState];
    
    return (
      <Image
        style={styles.image}  
        source={plantURL}
      />
    );
  }
}
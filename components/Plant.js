import React, { Component } from 'react';
import { View, Image, Animated } from 'react-native';
import styles from './styles';

export default class Plant extends Component {
  constructor() {
    super()
    this.springValue = new Animated.Value(0.75)
  }

  spring () {
    this.springValue.setValue(0)
    Animated.spring(
      this.springValue,
      {
        toValue: 0.75,
        friction: 3
      }
    ).start()
  }

  render() {
    if (this.props.plantSpring){
      this.spring()
    }
    const IMAGES = {
      image0: require('../assets/plant-dead.gif'),
      image1: require('../assets/plant-dirt.gif'),
      image2: require('../assets/plant-small.gif'),
      image3: require('../assets/plant-medium.gif'),
      image4: require('../assets/plant-large.gif'),
    }

    const IMAGES_WATER = {
      image0: require('../assets/plant-dead-water.gif'),
      image1: require('../assets/plant-dirt-water.gif'),
      image2: require('../assets/plant-small-water.gif'),
      image3: require('../assets/plant-medium-water.gif'),
      image4: require('../assets/plant-large-water.gif'),
    }

    const plantURL = IMAGES['image' + this.props.plantState];
    const plantWaterURL = IMAGES_WATER['image' + this.props.plantState];
    
    return (
      <Animated.Image
        style={{
          width: '50%',
          height: '60%',
          transform: [{scale: this.springValue}]
        }}
        source={this.props.plantWaterState  === 1 ? plantWaterURL : plantURL}
      />
    );
  }
}
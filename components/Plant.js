import React, { Component } from 'react';
import { View, Image, Animated } from 'react-native';
import styles from './styles';

export default class Plant extends Component {
  constructor() {
    super()
    this.springValue = new Animated.Value(1)
  }

  spring () {
    this.springValue.setValue(0)
    Animated.spring(
      this.springValue,
      {
        toValue: 1,
        friction: 3
      }
    ).start()
  }

  render() {
    if (this.props.plantSpring){
      this.spring()
    }
    const IMAGES = {
      1: {
        image0: require('../assets/plant-dead.gif'),
        image1: require('../assets/plant-dirt.gif'),
        image2: require('../assets/plant-small.gif'),
        image3: require('../assets/plant-medium.gif'),
        image4: require('../assets/plant-large.gif'),
      },
      2: {
        image0: require('../assets/plant2-dead.gif'),
        image1: require('../assets/plant2-dirt.gif'),
        image2: require('../assets/plant2-small.gif'),
        image3: require('../assets/plant2-medium.gif'),
        image4: require('../assets/plant2-large.gif'),
      }
    }

    const IMAGES_WATER = {
      1: {
        image0: require('../assets/plant-dead-water.gif'),
        image1: require('../assets/plant-dirt-water.gif'),
        image2: require('../assets/plant-small-water.gif'),
        image3: require('../assets/plant-medium-water.gif'),
        image4: require('../assets/plant-large-water.gif'),
      },
      2: {
        image0: require('../assets/plant2-dead-water.gif'),
        image1: require('../assets/plant2-dirt-water.gif'),
        image2: require('../assets/plant2-small-water.gif'),
        image3: require('../assets/plant2-medium-water.gif'),
        image4: require('../assets/plant2-large-water.gif'),
      }
    }

    const plantURL = IMAGES[this.props.plantType]['image' + this.props.plantState];
    const plantWaterURL = IMAGES_WATER[this.props.plantType]['image' + this.props.plantState];
    
    return (
      <Animated.Image
        style={{
          width: '100%',
          height: '40%',
          transform: [{scale: this.springValue}]
        }}
        source={this.props.plantWaterState === 1 ? plantWaterURL : plantURL}
      />
    );
  }
}
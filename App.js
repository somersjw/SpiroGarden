import React from 'react';
import {
  StyleSheet,
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import HomeScreen from './components/HomeScreen';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import progress from './components/progress';
import Settings from './components/Settings';
import { changePlant } from './components/gameFunctions';


const AppNavigator = createDrawerNavigator({
  Home: {
    screen: HomeScreen
  },
  Progress: {
    screen: progress
  },
  Settings: {
    screen: Settings
  }
});


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

const AppContainer = createAppContainer(AppNavigator);
console.disableYellowBox = true;
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}


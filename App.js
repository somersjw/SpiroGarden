import React from 'react';
import HomeScreen from './components/HomeScreen';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import progress from './components/progress';
import Settings from './components/Settings';
import SplashScreen from './components/SplashScreen.js';
import {initalizeRoundTable} from './components/dbGateway';


const AppNavigator = createDrawerNavigator({
  Splash: {
    screen: SplashScreen,
    navigationOptions: {
      drawerLabel: ()=>null,
    }
  },
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

// AppNavigator.navigationOptions = ({ navigation }) => {
//   let drawerLockMode = 'unlocked';
//   if (navigation.state.params) {
//     drawerLockMode = 'locked-closed';
//   } 

//   return {
//     drawerLockMode,
//   };
// };

initalizeRoundTable();
const AppContainer = createAppContainer(AppNavigator);
console.disableYellowBox = true;
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}


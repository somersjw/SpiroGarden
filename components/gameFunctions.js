import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
export function AsyncAlert(title, message) {
    return new Promise((resolve, reject) => {
        Alert.alert(
            title,
            message,
            [
                {text: "OK", onPress: () => { resolve('YES') }}
            ],
            { cancelable: false }
        )
    })
  }

  export async function fetchSpiroData(){
    return new Promise(function(resolve, reject) {
        fetch('http://67.205.163.230', {header: {
          'Content-Type': 'application/json'}
        })
          .then((response) => resolve(response.json()))
          .catch((error) =>{
            console.error(error);
          });
    })
}

export async function changePlant(change) {
    if (change < 0) {
        // reset to 0
        await storeData('@plant_level', '0');
    }
    else {
        let currentLevel = parseInt(await getData('@plant_level'));
        currentLevel += change;
        if (currentLevel > 4) {
            currentLevel = 4;
        }
        else if (currentLevel < 0) {
            currentLevel = 0;
        }
        console.log(currentLevel.toString());
        storeData('@plant_level', currentLevel.toString());
    }
}

export async function getData(key) {
    try {
      const value = await AsyncStorage.getItem(key)
      if(value !== null) {
        return value;
      }
    } catch(e) {
        return 0;
    }
  }

  storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
        console.log(e)
    }
  }
  
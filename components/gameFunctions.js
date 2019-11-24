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

export async function fetchHardwareData(){
  return new Promise(function(resolve, reject) {
      fetch('http://ec2-3-14-152-39.us-east-2.compute.amazonaws.com/api/v1/reading', {header: {
        'Content-Type': 'application/json'}
      })
        .then((response) => resolve(response.json()))
        .catch((error) =>{
          console.error(error);
        });
  })
}

export async function initializePlant() {
    let timeaway = await getData('@interval_time');
    if (isNaN(timeaway)){
      await storeData('@interval_time',Date.now().toString())
    }
    timeaway = await getData('@interval_time');
    console.log(parseFloat(timeaway));
    console.log(Date.now());
    if (Date.now() - parseFloat(timeaway) > 100 * 1000){
      await AsyncAlert("Oh No!", "Your plant has wilted due to lack of water!");
      await storeData('@plant_level', '0');
      await storeData('@plant_progress','0');
      await storeData('@interval_time',Date.now().toString())
    }
    let level = await getData('@plant_level');
    if (level === -1) {
        await storeData('@plant_level', '1');
        await storeData('@plant_progress','0');
    }
}

export async function getdatmoney(newmoney) {
    let currentmoney = await getData('@money');
    if (currentmoney === -1){
      await storeData('@money', '0');
    }
    currentmoney = await getData('@money');
    let nowmoney = parseInt(currentmoney) + newmoney;
    await storeData('@money', nowmoney.toString());
    return nowmoney;
}

export async function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export async function changePlant(change) {
    if (change < 0) {
        // reset to 0
        await storeData('@plant_level', '1');
        await storeData('@plant_progress','0');
        await storeData('@homescreen_tutorial','-1');
        await storeData('@progress_tutorial','-1');
        await storeData('@settings_tutorial','-1');
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
        storeData('@plant_level', currentLevel.toString());
        await storeData('@plant_progress','0');
    }
}

export async function saveprogress (savedata) {
  await storeData('@plant_progress', savedata);
}

export async function getData(key) {
    try {
      const value = await AsyncStorage.getItem(key)
      if(isNaN(value)) {
        return -1;
      }
      if(value !== null) {
        return value;
      }
    } catch(e) {
        return -1;
    }
  }

  export function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

  export async function storeData (key, value) {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
        console.log(e)
    }
  }
  
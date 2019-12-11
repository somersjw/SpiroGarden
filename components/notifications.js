    import {getDailyRounds} from './dbGateway';
    import moment from 'moment';
    import { getData } from './gameFunctions';
    import {Platform} from 'react-native';

    export async function sendLocalNotification(time) {
        if (Platform.OS === 'ios') {
            return;
        }
        let completedRounds = await getDailyRounds();
        let timeToSend = await getTimeToSend(completedRounds);

        var PushNotification = require("react-native-push-notification");
        PushNotification.localNotificationSchedule({
            message: "Time to water your plant!",
            date: new Date(timeToSend)
          });
      }

      async function getTimeToSend(completedRounds) {
          let userRPD = parseInt(await getData('@userRPD'));
          if (completedRounds >= userRPD) {
              console.log('Notification scheduled for 10am');
              return moment().add(1,'days').set({'hour': 10, 'minute': 0}).toISOString();
          }
          else {
              return moment().add(1, 'hours').toISOString();
          }
      }
    import {getDailyRounds} from './dbGateway';
    import moment from 'moment';


    export async function sendLocalNotification(time) {
        let completedRounds = await getDailyRounds();
        let timeToSend = getTimeToSend(completedRounds);

        var PushNotification = require("react-native-push-notification");
        PushNotification.localNotificationSchedule({
            message: "Time to water your plant!",
            date: new Date(timeToSend)
          });
      }

      function getTimeToSend(completedRounds) {
          if (completedRounds >= 3) {
              console.log('Notification scheduled for 10am');
              return moment().add(1,'days').set({'hour': 10, 'minute': 0}).toISOString();
          }
          else {
              return moment().add(1, 'hours').toISOString();
          }
      }
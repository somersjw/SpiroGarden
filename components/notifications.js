    export function sendLocalNotification(time) {
        var PushNotification = require("react-native-push-notification");

        PushNotification.localNotificationSchedule({
            message: "Time to water your plant!",
            date: new Date(Date.now() + 10 * 1000) // in 10 secs
          });
      }
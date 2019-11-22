// react-native.config.js
module.exports = {
  dependencies: {
    'react-native-push-notification': {
        platforms: {
          android: null, // disable Android platform, other platforms will still autolink if provided
        },
      },
      'react-native-sqlite-storage': {
        platforms: {
          android: null, // disable Android platform, other platforms will still autolink if provided
        },
      }
  },
  project: {
    ios: {},
    android: {},
  },
  assets: ["./assets/fonts/"],
};
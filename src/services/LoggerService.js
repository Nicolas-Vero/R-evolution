/* eslint no-console:0 */

import { LogBox } from 'react-native';

export default class LoggerService {
  static init = () => {
    LoggerService.info('Init LoggerService');

    LogBox.ignoreLogs([
      'Remote debugger',
      'Unrecognized WebSocket connection option(s)',
      'Rename componentWillMount to UNSAFE_componentWillMount',
      'Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps',
      'Unrecognized WebSocket connection option',
      'measureLayoutRelativeToContainingList',
      'VirtualizedLists should never be nested',
    ]); // ... gerer UNSAFE
  };

  static info = (...m) => {
    console.info(...m);
    // crashlytics().log(`info - ${m[0]}`);
  };

  static warn = (...m) => {
    console.warn(...m);
    // crashlytics().log(`warn - ${m[0]}`);
  };

  static error = (...m) => {
    console.error(...m);
    // crashlytics().log(`error - ${m[0]}`);
  };
}

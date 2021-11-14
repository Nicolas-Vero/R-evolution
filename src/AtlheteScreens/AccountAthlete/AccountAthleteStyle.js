import { StyleSheet, Platform, StatusBar } from 'react-native';
import {
  widthPercentageToDP ,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

module.exports = StyleSheet.create({
    backgroundContainer: {
      resizeMode: 'contain',
      width: widthPercentageToDP(94),
      height: 60,
    },
    background: {
      backgroundColor: 'black',
      flex: 1,
    },
  });
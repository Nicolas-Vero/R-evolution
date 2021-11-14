import { StyleSheet, Platform, StatusBar } from 'react-native';
import {
  widthPercentageToDP ,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

module.exports = StyleSheet.create({

    Logo: {
      resizeMode: 'contain',
      width: 25,
      height: 30,
      marginRight: 25,
    },
    container: {
      backgroundColor: '#1E2026',
      flexDirection: 'column',
      margin: 5,
      borderRadius: 5,
      alignContent: 'center',
      justifyContent: 'center',
      height: 70,
    },
    text: {
      fontFamily: 'RobotoBold',
      fontSize: 15,
      color: 'black',
      marginLeft: 15,
      color: 'white',
    },
    textBlue: {
      fontFamily: 'RobotoBold',
      fontSize: 15,
      marginLeft: 15,
      marginTop: 9,
      color: '#2CDEE4',
    },
  });
  
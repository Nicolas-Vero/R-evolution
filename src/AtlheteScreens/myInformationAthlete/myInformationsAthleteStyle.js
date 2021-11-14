import { StyleSheet, Platform, StatusBar } from 'react-native';
import {
  widthPercentageToDP ,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

module.exports = StyleSheet.create({
    day: {
      height: 70,
      width: widthPercentageToDP(13.5),
      marginHorizontal: 2,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    inputs: {
      marginVertical: heightPercentageToDP(1),
      alignItems: 'center',
    },
    container: {
      backgroundColor: '#FFFFFF',
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 15,
      width: widthPercentageToDP(92),
      borderRadius: 5,
      paddingRight: 15,
    },
    background: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    field: {
      backgroundColor: '#FFFFFF',
      width: widthPercentageToDP(92),
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5,
    },
    container2: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    container3: {
      maxHeight: heightPercentageToDP(25),
      width: widthPercentageToDP(92),
      padding: 5,
      justifyContent: 'center',
    },
    text: {
      fontFamily: 'RobotoBold',
      fontSize: 15,
      color: '#FFFFFF',
      marginLeft: 15,
      marginBottom: 10,
    },
  });
  
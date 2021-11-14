import { StyleSheet, Platform, StatusBar } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

module.exports = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: '#1E2026',
      borderRadius: 20,
      padding: 35,
      height: 200,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    day: {
      height: 80,
      width: 50,
      backgroundColor: '#2D333C',
      margin: 5,
      borderColor:'#2CDEE4',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
  });
  
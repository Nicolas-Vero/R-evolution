import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';
import {
  widthPercentageToDP ,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
const { width } = Dimensions.get('window');

module.exports = StyleSheet.create({

    bcontainer: {
      height: 55,
      width: widthPercentageToDP(94),
      backgroundColor: '#2CDEE4',
      borderRadius: 3,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      margin:10,
    },
    safeArea: {
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: width,
      height: 49,
      marginTop: 29,
      marginBottom: 49,
      paddingLeft: 16,
      paddingRight: 16,
    },
    title: {
      color: '#FFFFFF',
      fontWeight: '500',
      fontSize: 15,
      fontStyle: 'italic',
      textAlign: 'center',
      marginTop: 112,
    },
    buttonContainer: {
      flexDirection: 'row',
      width: width,
      justifyContent: 'space-between',
      marginBottom: 35,
    },
  });
  
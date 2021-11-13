import { StyleSheet, Platform, StatusBar } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

module.exports = StyleSheet.create({
  background: {
    flex: 1,
  },
  form1: {
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    borderRadius: 5,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    marginRight: 5,
    height: 50,
  },
  form2: {
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    borderRadius: 5,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    width: wp(92),
    height: 50,
  },
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  dropdownButton: {
    backgroundColor: 'transparent',
    width: wp(23),
    borderRadius: 3,
    height: 38,
  },
  dropdownBg: {
    backgroundColor: '#000',
    borderRadius: 5,
  },
  dropdownRow: {
    height: 45,
    borderBottomColor: '#000',
  },
  dropdownRowText: {
    textAlign: 'left',
    marginHorizontal: 10,
  },
});

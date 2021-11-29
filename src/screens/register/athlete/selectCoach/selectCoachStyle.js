import { StyleSheet, Platform, StatusBar } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
module.exports = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  content: {
    alignItems: 'center',
    marginTop: 64,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'RobotoBold',
    fontSize: 16,
    color: '#FFFF',
  },
  form: {
    height: heightPercentageToDP(55),
  },
  commercialTitle: {},
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  dropdownContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  dropdownButton: {
    width: widthPercentageToDP(90),
    borderRadius: 3,
    height: 38,
  },
  dropdownButtonText: {
    fontSize: 15,
    textAlign: 'left',
    fontFamily: 'Roboto',
  },
  dropdownRowText: {
    fontFamily: 'Roboto',
    color: '#DFDFDF',
    fontSize: 15,
    textAlign: 'left',
    marginLeft: 20,
  },
  dropdownBg: {
    backgroundColor: '#282C3A',
  },
  dropdownRow: {
    height: 40,
    borderBottomColor: '#50525B',
  },
  noWayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noWayCheckBox: {
    paddingLeft: 0,
    marginLeft: 0,
    paddingRight: 0,
    borderWidth: 0,
  },
  noWayText: {
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    fontSize: 15,
  },
  errorContainer: {
    alignItems: 'flex-end',
  },
  errorText: {
    fontSize: 12,
    color: '#FD7279',
  },
  nextButtonText: {
    fontFamily: 'RobotoBold',
    fontSize: 17,
  },
});

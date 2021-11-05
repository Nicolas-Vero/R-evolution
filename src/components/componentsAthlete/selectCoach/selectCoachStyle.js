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
    height: heightPercentageToDP(75),
  },
  title: {
    textAlign: 'center',
    marginTop: 64,
    fontFamily: 'RobotoBold',
    fontSize: 16,
    color: '#FFFF',
  },
  subTitle: {
    textAlign: 'center',
    marginTop: 25,
    fontFamily: 'RobotoBold',
    fontSize: 17,
    color: '#FFFF',
  },
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  dropdownContainer: {
    width: widthPercentageToDP(95),
  },
  dropdownButton: {
    width: widthPercentageToDP(70),
    borderRadius: 3,
    height: 35,
  },
  dropdownButtonText: {
    fontSize: 15,
    textAlign: 'left',
  },
  dropdownRowText: {
    color: 'white',
    fontSize: 13,
    marginRight: 90,
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
    marginTop: 15,
    marginBottom: 24,
  },
  noWayText: {
    flex: 1,
    flexWrap: 'wrap',
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    fontSize: 13,
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

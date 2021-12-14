import { widthPercentageToDP } from 'react-native-responsive-screen';
import { StyleSheet, Platform, StatusBar } from 'react-native';

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
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginTop: 64,
    fontFamily: 'RobotoBold',
    fontSize: 16,
    color: '#FFFF',
  },
  subTitle: {
    marginTop: 50,
    fontFamily: 'RobotoBold',
    fontSize: 17,
    color: '#FFFF',
  },
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  selectContainer: {
    marginTop: 60,
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
  nextButtonText: {
    fontFamily: 'RobotoBold',
    fontSize: 17,
  },
});

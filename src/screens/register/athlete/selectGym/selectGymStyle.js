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
    marginTop: 20,
    alignItems: 'center',
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
  nextButtonText: {
    fontFamily: 'RobotoBold',
    fontSize: 17,
  },
});

import { widthPercentageToDP } from 'react-native-responsive-screen';
import { StyleSheet, Platform, StatusBar } from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  content: {
    flex: 1,
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
  top: {
    justifyContent: 'flex-start',
    flex: 1,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 50,
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

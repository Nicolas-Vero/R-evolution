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
    flex: 1,
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
    marginTop: 24,
    fontFamily: 'RobotoBold',
    fontSize: 16,
    color: '#FFFF',
  },
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  healthContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  dropdownContainer: {
    width: 'auto',
  },
  dropdownButton: {
    width: widthPercentageToDP(50),
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
  inputContainer: {
    marginTop: 24,
    height: 125,
    width: widthPercentageToDP(93),
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#FFFFFF',
    width: 'auto',
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 10,
    height: 120,
    borderRadius: 3,
    justifyContent: 'flex-start',
  },
  nextButtonText: {
    fontFamily: 'RobotoBold',
    fontSize: 17,
  },
});

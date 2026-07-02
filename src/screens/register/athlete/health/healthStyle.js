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
  top: {
    justifyContent: 'flex-start',
    flex: 1,
    alignItems: 'center',
    marginTop: 24,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 50,
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

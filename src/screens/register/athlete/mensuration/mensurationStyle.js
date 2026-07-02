import { widthPercentageToDP } from 'react-native-responsive-screen';
import { StyleSheet, Platform, StatusBar } from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    textAlign: 'center',
    marginTop: 64,
    marginBottom: 30,
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
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 3,
    height: 45,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 15,
    width: widthPercentageToDP(50),
  },
  errorInputContainer: {
    marginTop: 2,
    alignItems: 'flex-end',
  },
  errorInputText: {
    fontSize: 12,
    color: '#FD7279',
  },
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  buttonText: {
    fontFamily: 'RobotoBold',
    fontSize: 17,
    color: '#393637',
  },
});

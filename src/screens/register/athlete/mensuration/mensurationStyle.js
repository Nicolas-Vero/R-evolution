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
    marginTop: 88,
    fontFamily: 'RobotoBold',
    fontSize: 16,
    color: '#FFFF',
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#FFFFFF',
    width: widthPercentageToDP(50),
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 3,
    fontSize: 15,
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
  buttonContainer: {
    marginBottom: 27,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'RobotoBold',
    fontSize: 17,
    color: '#393637',
  },
});

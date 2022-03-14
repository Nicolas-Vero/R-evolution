import { StyleSheet, Platform, StatusBar } from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  scrollView: {
    flex: 1,
  },
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  formContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  checkbox: {
    paddingLeft: 0,
    marginLeft: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  checkboxTextColor: {
    color: '#FFFFFF',
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
  },
  errorInputContainer: {
    marginTop: 2,
    alignItems: 'flex-end',
  },
  errorInputText: {
    fontSize: 12,
    color: '#FD7279',
  },
  errorEmailExist: {
    fontSize: 12,
    color: '#FD7279',
    marginBottom: 10,
    textAlign: 'center',
  },
  acceptContainer: {
    paddingLeft: 0,
    marginLeft: 0,
  },
  acceptText: {
    flex: 1,
    color: '#979797',
    fontFamily: 'Roboto',
    fontSize: 12,
  },
  acceptTextLink: {
    color: '#FFFFFF',
  },
  butonContainer: {
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'RobotoBold',
    fontSize: 17,
  },
  alreadyMemberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
  },
  alreadyMemberText: {
    fontSize: 12,
    color: '#fff',
    fontFamily: 'Montserrat',
  },
  alreadyMemberTextUnderline: {
    fontSize: 12,
    color: '#2CDEE4',
    textDecorationLine: 'underline',
    fontFamily: 'Montserrat',
  },
});

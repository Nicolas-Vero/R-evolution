import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  inputContainer: {
    marginBottom: 15,
  },
  checkbox: {
    marginBottom: 0,
    marginTop: 0,
    paddingLeft: 0,
    marginLeft: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  checkBoxText: {
    color: '#fff',
    fontFamily: 'RobotoMedium',
    fontSize: 14,
  },
  input: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    height: 38,
    borderRadius: 3,
    fontSize: 15,
    fontFamily: 'Roboto',
  },
  textArea: {
    backgroundColor: '#FFFFFF',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    height: 180,
    borderRadius: 3,
    fontSize: 15,
    fontFamily: 'Roboto',
  },
  bottomInputContainer: {
    marginTop: 17,
    marginBottom: 25,
    flexDirection: 'row',
  },
  bottomInput: {
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    width: 80,
    height: 30,
    borderRadius: 3,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width,
    height: 49,
    marginTop: 29,
    marginBottom: 49,
    paddingLeft: 16,
    paddingRight: 16,
  },
  text: {
    fontFamily: 'RobotoBold',
    fontSize: 15,
    color: '#FFFFFF',
    lineHeight: 18,
    marginBottom: 10,
  },
  seanceContainer: {
    marginRight: 100,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  euro: {
    fontFamily: 'RobotoBold',
    fontSize: 22,
    color: '#FFFFFF',
    marginLeft: 5,
  },

  button: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonTextStyle: {
    fontSize: 15,
    fontFamily: 'RobotoBold',
  },
});

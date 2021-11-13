import { StyleSheet, Platform, StatusBar } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    alignItems: 'center',
    flex: 1,
  },
  ScrollView: {
    flex: 1,
  },
  formContainer: {
    marginTop: 70,
    paddingHorizontal: 15,
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  formRowText: {
    color: '#fff',
    fontFamily: 'RobotoBold',
    fontSize: 15,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputTop: {
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 7,
    paddingTop: 10,
    borderRadius: 3,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    marginRight: 15,
    height: 38,
  },
  input: {
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    borderRadius: 5,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    width: wp(92),
    height: 38,
  },
  textArea: {
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    borderRadius: 5,
    paddingBottom: 170,
    paddingLeft: 15,
    paddingRight: 15,
    width: wp(92),
    height: 200,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  dropdownButton: {
    alignItems: 'flex-start',
    padding: 0,
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: 48,
  },
  dropdownBg: {
    backgroundColor: '#000',
    borderRadius: 5,
  },

  dropdownRow: {
    height: 45,
    borderBottomColor: '#000',
  },
  dropdownRowText: {
    textAlign: 'left',
    marginHorizontal: 10,
  },
  buttonContainer: {
    marginTop: 10,
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonText: {
    color: 'black',
    fontFamily: 'RobotoBold',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

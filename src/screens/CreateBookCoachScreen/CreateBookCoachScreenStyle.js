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
    marginHorizontal: 16,
  },
  scrollView: {
    maxHeight: 300,
  },
  dropdownButton: {
    marginVertical: 10,
    width: 'auto',
    borderRadius: 3,
    height: 38,
  },
  checkBoxContainer: {
    marginLeft: 0,
    marginVertical: 5,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  checkBoxText: {
    color: '#fff',
    fontFamily: 'RobotoMedium',
    fontSize: 14,
    marginLeft: 16,
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
  background: {
    flex: 1,
  },
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    width: 'auto',
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 3,
    height: 45,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 15,
    fontFamily: 'Roboto',
  },
  addProspectText: {
    fontSize: 14,
    fontFamily: 'RobotoMedium',
    color: '#fff',
    marginVertical: 10,
  },
  addProspectCheckBoxContainer: {
    flexDirection: 'row',
  },
});

import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { isIphoneX } from 'react-native-iphone-x-helper';

const { width } = Dimensions.get('window');

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    marginHorizontal: 16,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flex: 1,
  },
  headerMidle: {
    flex: 1,
    alignItems: 'center',
  },
  headerRight: {
    flex: 1,
  },
  content: {
    marginHorizontal: 16,
  },
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  checkBox: {
    paddingTop: 0,
    paddingLeft: 0,
    marginLeft: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width,
    height: 49,
    marginTop: 29,
    marginBottom: 49,
    paddingLeft: 16,
    paddingRight: 16,
  },
  inputContainer: {
    marginBottom: 15,
  },
  subTitleColored: {
    color: '#2CDEE4',
  },
  input: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: wp(92),
    height: 38,
    borderRadius: 3,
    fontFamily: 'Roboto',
    fontSize: 15,
  },
  inputWithButtonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    width: wp(93),
  },
  inputWithButton: {
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    width: wp(85),
  },
  addButton: {
    marginLeft: 5,
  },
  dropdownButton: {
    width: wp(90),
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
  changePasswordContainer: {
    marginVertical: 20,
  },
  changePasswordButton: {
    borderColor: 'black',
    backgroundColor: '#1E2026',
    height: 38,
    width: wp(92),
    borderRadius: 3,
    marginBottom: 7,
  },
  changePasswordText: {
    fontFamily: 'Roboto',
    fontSize: 15,
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 15,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  dropdownButton: {
    width: wp(93),
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
  sliderTrack: {
    height: 7,
    backgroundColor: '#282C3A',
    borderRadius: 5,
  },
  sliderMarker: {
    backgroundColor: '#2CDEE4',
    height: 16,
    width: 16,
    borderColor: '#2CDEE4',
    justifyContent: 'center',
    marginTop: 7,
  },
  sliderSelected: {
    backgroundColor: '#2CDEE4',
  },
  dayContainer: {
    height: 56,
    width: 39,
    marginHorizontal: 5,
    borderColor: '#2CDEE4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  dayTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayTextNum: {
    fontSize: 10,
    fontFamily: 'MontserratMedium',
  },
  validateButton: {
    marginTop: 40,
    marginBottom: 50,
  },
  validateButtonText: {
    fontFamily: 'RobotoBold',
    fontSize: 15,
  },
  center: {
    alignItems: 'center',
    width: '100%',
  },
});

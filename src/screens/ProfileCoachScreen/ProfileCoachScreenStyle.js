import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const { width } = Dimensions.get('window');

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  headerLeft: {
    alignItems: 'flex-start',
  },
  headerMidle: {
    marginTop: 30,
    alignItems: 'center',
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  content: {
    marginHorizontal: 16,
  },
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  checkBox: {
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
  previewImage: {
    width: 105,
    height: 105,
    resizeMode: 'contain',
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
  validateButton: {
    alignItems: 'center',
    marginVertical: 20,
  },
  validateButtonText: {
    fontFamily: 'RobotoBold',
    fontSize: 15,
  },
});

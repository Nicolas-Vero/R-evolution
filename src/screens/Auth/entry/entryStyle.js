import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

module.exports = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
    alignItems: 'center',
  },
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerContaner: {
    flex: 1,
    marginTop: 50,
  },
  logoImage: {
    marginTop: heightPercentageToDP(15),
    height: 60,
    width: wp(75),
    resizeMode: 'contain',
  },
  title: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 18.5,
    fontFamily: 'MontserratItalic',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 90,
  },
  subtitle: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 18.5,
    fontFamily: 'Montserrat',
    textAlign: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 50,
    marginLeft: 15,
    marginRight: 15,
  },
  buttonRegisterText: {
    color: '#393637',
    fontFamily: 'RobotoBold',
    fontWeight: 'bold',
    fontSize: 17,
  },
  buttonLoginText: {
    color: '#FFFFFF',
    fontFamily: 'RobotoBold',
    fontWeight: 'bold',
    fontSize: 17,
  },
  loginButton: {
    marginHorizontal: 10,
    width: wp(42),
    height: 48,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2CDEE4',
    backgroundColor: 'transparent',
  },
  registerButton: {
    marginHorizontal: 10,
    width: wp(42),
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
});

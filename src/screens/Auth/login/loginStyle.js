import { StyleSheet, Platform, StatusBar } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  image: {
    height: heightPercentageToDP(20),
    width: wp(90),
    resizeMode: 'contain',
    marginBottom: 30,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: heightPercentageToDP(5),
  },
  input: {
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    height: 38,
    width: wp(92),
    borderRadius: 3,
    paddingLeft: 15,
  },
  forgetPasswordText: {
    marginTop: 15,
    fontFamily: 'Roboto',
    color: '#B9B9BC',
    fontSize: 12,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  button: {
    width: wp(94),
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: 'RobotoBold',
    fontWeight: 'bold',
    fontSize: 17,
  },
  notYetMemberContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  notYetMemberText: {
    fontSize: 12,
    fontFamily: 'Roboto',
    color: '#B9B9BC',
  },
  notYetMemberTextColor: {
    fontSize: 12,
    fontFamily: 'Roboto',
    color: '#2CDEE4',
  },
});

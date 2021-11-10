import { widthPercentageToDP } from 'react-native-responsive-screen';
import { StyleSheet, Platform, StatusBar } from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginTop: 64,
    fontFamily: 'RobotoBold',
    fontSize: 16,
    color: '#FFFF',
  },
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  track: {
    height: 10,
    backgroundColor: '#282C3A',
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: '#2CDEE4',
  },
  sliderContainer: {},
  infoContainer: {
    marginVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
    width: widthPercentageToDP(40),
    backgroundColor: '#282C3A',
    borderRadius: 5,
  },
  textInfo: {
    marginVertical: 10,
    marginHorizontal: 14,
    fontFamily: 'RobotoMedium',
    fontSize: 16,
    color: '#FFFF',
  },
  buttonText: {
    fontFamily: 'RobotoBold',
    fontSize: 17,
  },
});

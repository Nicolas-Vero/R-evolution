import { StyleSheet, Platform, StatusBar } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
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
    height: heightPercentageToDP(75),
  },
  title: {
    textAlign: 'center',
    marginTop: 64,
    fontFamily: 'RobotoBold',
    fontSize: 16,
    color: '#FFFF',
  },
  subTitleColored: {
    color: '#2CDEE4',
  },
  subTitle: {
    textAlign: 'center',
    marginTop: 25,
    fontFamily: 'RobotoBold',
    fontSize: 17,
    color: '#FFFF',
  },
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  sliderContainer: {
    marginTop: 10,
    alignItems: 'center',
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
  daysTitle: {
    textAlign: 'center',
    marginTop: 75,
    fontFamily: 'RobotoBold',
    fontSize: 16,
    color: '#FFFF',
  },
  flatlist: {
    marginTop: 30,
    width: 'auto',
    alignSelf: 'center',
    },
  day: {
    height: 57,
    width: 40,
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  nextButtonText: {
    fontFamily: 'RobotoBold',
    fontSize: 17,
  },
});

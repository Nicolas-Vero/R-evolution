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
    flex: 1,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    textAlign: 'center',
    marginTop: 64,
    fontFamily: 'RobotoBold',
    fontSize: 16,
    color: '#FFFF',
  },
  top: {
    justifyContent: 'flex-start',
    flex: 1,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 50,
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

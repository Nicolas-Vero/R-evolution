import { widthPercentageToDP } from 'react-native-responsive-screen';
import { StyleSheet, Platform, StatusBar } from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  content: {
    flex: 1,
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
  infoContainer: {
    marginVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    backgroundColor: '#282C3A',
    borderRadius: 5,
  },
  textInfo: {
    marginVertical: 10,
    marginHorizontal: 14,
    fontFamily: 'RobotoBold',
    fontSize: 16,
    color: '#FFFF',
  },
  textInfoBold: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFFF',
  },
  buttonText: {
    fontFamily: 'RobotoBold',
    fontSize: 17,
  },
  top: {
    justifyContent: 'flex-start',
    flex: 1,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 50,
  },
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
  },
});

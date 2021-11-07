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
    marginTop: 88,
    fontFamily: 'RobotoBold',
    fontSize: 16,
    color: '#FFFF',
  },
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  subTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#FFFF',
    textAlign: 'center',
  },
  photoPickerContainer: {
    marginTop: 65,
    alignItems: 'center',
  },
  previewImage: {
    height: 141,
    width: 141,
    resizeMode: 'contain',
  },
  buttonText: {
    fontFamily: 'RobotoBold',
    fontSize: 17,
  },
});

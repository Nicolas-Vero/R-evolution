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
  safeArea: {
    flex: 1,
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
    borderRadius: 70,
    height: 141,
    width: 141,
    resizeMode: 'contain',
  },
  button: {
    width: '100%',
    backgroundColor: '#2CDEE4',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: 35,
    borderRadius: 3,
    marginLeft: 10,
  },
  buttonText: {
    fontFamily: 'RobotoBold',
    fontSize: 17,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 50,
  },
});

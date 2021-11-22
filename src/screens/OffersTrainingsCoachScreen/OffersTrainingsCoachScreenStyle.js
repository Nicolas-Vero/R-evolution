import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    height: hp(70),
  },
  centerAlign: {
    paddingTop: 5,
    alignContent: 'center',
    justifyContent: 'center',
  },
  offerImageContent: {
    height: hp(49),
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  image: {
    resizeMode: 'cover',
    opacity: 0.4,
  },
  trainingContainer: {
    marginTop: 25,
  },
  trainingImageContent: {
    height: hp(26),
    justifyContent: 'center',
    marginHorizontal: 16,
  },

  imageTextContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 18,
    marginLeft: 18,
  },
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  title: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 20,
    fontFamily: 'MontserratBoldItalic',
  },
  subTitle: {
    marginTop: 10,
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontSize: 15,
    fontFamily: 'Roboto',
  },
});

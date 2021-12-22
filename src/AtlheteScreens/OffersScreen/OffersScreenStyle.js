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
  alignCenter: {
    marginHorizontal: 20,
  },
  content: {
    marginHorizontal: 10,
    marginTop: 30,
  },
  flatlist: {
    marginTop: 25,
  },
  catalogItem: {
    flex: 1,
    borderRadius: 8,
    paddingHorizontal: 22,
    paddingVertical: 18,
    marginBottom: 5,
  },
  imageContainer: {
    marginVertical: 8,
  },
  catalogItemTitle: {
    fontFamily: 'MontserratBold',
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 20,
  },
  catalogItemDescription: {
    marginTop: 15,
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'Montserrat',
  },
  catalogItemCoaching: {
    marginTop: 10,
    color: '#2CDEE4',
    fontSize: 12,
    fontFamily: 'Roboto',
  },
  catalogItemButtonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 13,
  },
  catalogItemButton: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 3,
    paddingVertical: 9,
    paddingHorizontal: 20,
  },
  catalogItemButtonText: {
    fontSize: 11,
    fontFamily: 'RobotoMedium',
    color: '#393637',
  },
  catalogItemPrice: {
    fontFamily: 'MontserratBoldItalic',
    fontSize: 20,
    color: '#2CDEE4',
  },
  image: {
    resizeMode: 'contain',
    height: 60,
    width: '100%',
  },
  noCourContainer: {
    alignItems: 'center',
    marginTop: hp(25),
  },
  noCourText: {
    fontFamily: 'RobotoBold',
    fontSize: 20,
    color: '#FFFF',
  },
  currentOffer: {
    flexDirection: 'column',
    backgroundColor: 'grey',
    marginVertical: 10,
    borderRadius: 10,
    paddingVertical: 11,
    paddingHorizontal: 25,
  },
  currentOfferCoach: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentOfferCoachName: {
    fontSize: 18,
    marginLeft: 12,
    fontFamily: 'RobotoMedium',
    color: '#FFFFFF',
  },
  currentOfferTitle: {
    marginTop: 13,
    fontFamily: 'MontserratBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  currentOfferContent: {
    fontFamily: 'MontserratMedium',
    marginTop: 15,
    color: '#FFFFFF',
    fontSize: 10,
  },
  currentOfferInfos: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currentOfferSessions: {
    color: '#2CDEE4',
    fontFamily: 'Roboto',
    fontSize: 12,
  },
  currentOfferPrice: {
    fontFamily: 'MontserratBoldItalic',
    fontSize: 20,
    color: '#2CDEE4',
  },
  currentOfferSessionsLeftContainer: {
    backgroundColor: '#2CDEE4',
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  currentOfferSessionsLeftText: {
    fontFamily: 'Roboto',
    fontSize: 13,
  },
});

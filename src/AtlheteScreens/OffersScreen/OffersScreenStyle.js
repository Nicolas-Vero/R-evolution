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
});

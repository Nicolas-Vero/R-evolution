import { StyleSheet, Platform, StatusBar } from 'react-native';
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
    marginVertical: 16,
    alignItems: 'center',
  },
  addButton: {
    height: 57,
  },
  addButtonText: {
    fontFamily: 'MontserratBoldItalic',
    fontSize: 13,
    color: '#393637',
  },
  flatList: {
    marginTop: 20,
    height: 600,
  },
  item: {
    marginBottom: 10,
    borderRadius: 8,
    width: wp(94),
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 20,
    height: 160,
  },
  itemTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'MontserratBold',
    lineHeight: 19,
  },

  itemContent: {
    fontFamily: 'MontserratMedium',
    marginTop: 10,
    color: '#FFFFFF',
    fontSize: 10,
  },
  itemNbCredits: {
    marginTop: 10,
    color: '#2CDEE4',
    fontSize: 12,
    fontFamily: 'Roboto',
  },
  itemBottomContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 17,
  },
  itemBottomLeft: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemBottomPrice: {
    fontFamily: 'MontserratBoldItalic',
    fontWeight: '800',
    fontSize: 20,
    color: '#2CDEE4',
    marginRight: 15,
  },
});

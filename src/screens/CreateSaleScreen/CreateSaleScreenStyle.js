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
    flex: 1,
    paddingHorizontal: 16,
  },
  offerTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceInfo: {
    width: 67,
    height: 38,
    borderRadius: 3,
    backgroundColor: '#979797',
    alignItems: 'center',
    justifyContent: 'center',
  },
  offerInfo: {
    flex: 1,
    width: '100%',
    borderRadius: 3,
    height: 38,
    backgroundColor: '#979797',
    alignItems: 'center',
    justifyContent: 'center',
  },
  offerInfoText: {
    fontSize: 15,
    fontFamily: 'RobotoBold',
  },
  priceText: {
    fontSize: 15,
    fontFamily: 'RobotoBold',
    fontWeight: '700',
  },
  priceCurrency: {
    color: '#fff',
    marginLeft: 13,
    fontFamily: 'RobotoBold',
    fontSize: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 13,
    paddingVertical: 9,
    width: 'auto',
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 15,
    color: 'white',
    marginBottom: 13,
  },
  dropdownButton: {
    flex: 1,
    width: '100%',
    borderRadius: 3,
    height: 38,
  },
  dropdownButtonSmall: {
    flex: 1,
    marginHorizontal: 9,
    borderRadius: 3,
    height: 30,
  },
  priceInput: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 17,
    borderRadius: 3,
    height: 30,
    fontSize: 11,
    fontFamily: 'Roboto',
  },
  dropdownButtonText: {
    fontSize: 15,
    textAlign: 'left',
    fontFamily: 'Roboto',
  },
  dropdownRowText: {
    fontFamily: 'Roboto',
    color: '#DFDFDF',
    fontSize: 15,
    textAlign: 'left',
    marginLeft: 20,
  },
  dropdownBg: {
    backgroundColor: '#282C3A',
  },
  dropdownRow: {
    height: 40,
    borderBottomColor: '#50525B',
  },
  paymentInfoContainer: {
    marginTop: 20,
    flexDirection: 'row',
  },
  paymentInfoColumn: {
    flex: 1,
    flexDirection: 'column',
  },
  paymentInfoColumnCenter: {
    flexDirection: 'column',
    marginHorizontal: 5,
  },
  input: {
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    borderRadius: 5,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    height: 38,
    fontSize: 15,
    fontFamily: 'Roboto',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  euro: {
    fontFamily: 'RobotoBold',
    fontSize: 22,
    color: '#FFFFFF',
    marginLeft: 5,
  },
  addPaiementContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addPaiementText: {
    fontFamily: 'Roboto',
    fontSize: 15,
    marginLeft: 17,
    color: '#FFFFFF',
  },
  paymentContainer: {
    marginTop: 17,
  },
  paymentContent: {
    marginTop: 21,
  },
  noPaymentText: {
    fontSize: 12,
    fontFamily: 'Roboto',
    color: '#fff',
  },
  paymentItem: {
    marginRight: 5,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#979797',
    paddingLeft: 15,
    paddingRight: 40,
    paddingVertical: 7,
    marginVertical: 8,
    borderRadius: 3,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  nextPaymentItem: {
    marginRight: 5,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#2CDEE4',
    paddingLeft: 15,
    paddingRight: 40,
    paddingVertical: 7,
    borderRadius: 3,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  paymentTitle: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Roboto',
  },
  flatlist: {
    maxHeight: 150,
  },
  paiymentDelete: {
    position: 'absolute',
    zIndex: 1,
    width: 18,
    height: 18,
    backgroundColor: '#FD7279',
    borderRadius: 5,
    right: -5,
    top: -5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    maxHeight: 300,
  },
  paymentItemText: {
    fontSize: 12,
    fontFamily: 'RobotoMedium',
  },

  buttonText: {
    fontSize: 15,
    fontFamily: 'RobotoBold',
  },
});

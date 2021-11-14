import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginHorizontal: 16,
    paddingTop: 20,
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 15,
    color: 'white',
    marginBottom: 12,
  },
  dropdownButton: {
    width: wp(90),
    borderRadius: 3,
    height: 38,
  },
  dropdownButtonSmall: {
    width: wp(50),
    borderRadius: 3,
    height: 38,
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

  paymentItem: {
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#393637',
    paddingLeft: 25,
    paddingRight: 6,
    paddingVertical: 7,
    marginVertical: 5,
    borderRadius: 3,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  paymentItemText: {
    fontSize: 11,
    fontFamily: 'RobotoMedium',
    color: '#2CDEE4',
  },
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  buttonContainer: {
    marginTop: 20,
  },
  buttonText: {
    fontSize: 15,
    fontFamily: 'RobotoBold',
  },
});

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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginTop: 15,
  },
  headerCenter: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 16,
  },
  userStatusImage: {
    resizeMode: 'contain',
    width: 62,
    height: 29,
    marginRight: 16,
  },
  scrollView: {
    marginTop: 10,
    paddingHorizontal: 16,
    height: hp(65),
  },
  phoneNumberContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#2CDEE4',
    borderRadius: 3,
    justifyContent: 'center',
    justifyContent: 'space-between',
    paddingLeft: 11,
    paddingRight: 15,
    paddingVertical: 11,
    marginBottom: 5,
  },
  phoneNumberLeft: {
    alignItems: 'flex-start',
    flex: 1,
  },
  phoneNumberMidle: {
    alignItems: 'center',
    flex: 1,
  },
  phoneNumberRight: {
    alignItems: 'flex-end',
    flex: 1,
  },
  phoneNumberIndexText: {
    fontSize: 15,
    fontFamily: 'Roboto',
  },
  phoneNumberText: {
    justifyContent: 'center',
    fontFamily: 'RobotoBold',
    fontSize: 18,
  },
  phoneImg: {
    resizeMode: 'contain',
    width: 16,
    height: 16,
  },
  item: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#1E2026',
    flexDirection: 'column',
    marginVertical: 5,
    borderRadius: 3,
    alignContent: 'center',
    justifyContent: 'center',
  },
  itemRowLeft: {
    flex: 1,
    marginRight: 5,
  },
  itemRowRight: {
    flex: 1,
    marginLeft: 5,
  },
  infoText: {
    fontFamily: 'Roboto',
    fontSize: 15,
    color: 'white',
  },
  valueText: {
    fontSize: 12,
    marginTop: 12,
    fontFamily: 'Roboto',
    color: '#2CDEE4',
  },
  valueTextRow: {
    marginTop: 3,
    marginLeft: 12,
    fontSize: 12,
    fontFamily: 'Roboto',
    color: '#2CDEE4',
  },
  paiementList: {
    marginTop: 5,
    marginBottom: 10,
  },
  paiementItem: {
    marginVertical: 5,
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#2CDEE4',
    borderRadius: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  paiementItemText: {
    fontSize: 11,
    fontFamily: 'RobotoMedium',
  },
  addPaiementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  addPaiementIconMargin: {
    marginRight: 17,
  },
  flatlist: {
    marginTop: 15,
  },
  flatlistItem: {
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#2CDEE4',
    paddingVertical: 7,
    paddingHorizontal: 13,
    borderRadius: 21,
  },
  flatlistItemText: {
    fontSize: 12,
    fontFamily: 'MontserratMedium',
  },
  row: {
    flexDirection: 'row',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sportSlotText: {
    marginTop: 12,
    fontFamily: 'Montserrat',
    fontSize: 12,
    color: 'white',
  },
  textColored: {
    color: '#2CDEE4',
  },
  username: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 20,
    marginTop: 20,
    color: '#fff',
  },
  button: {
    marginTop: 5,
  },
  butonText: {
    fontSize:15,
    fontFamily: 'RobotoBold'
  }
});

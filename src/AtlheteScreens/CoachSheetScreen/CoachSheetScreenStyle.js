import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    marginTop: 15,
    alignItems: 'center',
  },
  username: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 20,
    marginTop: 20,
    color: '#fff',
  },
  trainingPlace: {
    fontFamily: 'Roboto',
    fontSize: 12,
    marginTop: 16,
    color: '#2CDEE4',
  },
  content: {
    paddingHorizontal: 16,
  },
  scrollView: {
    marginTop: 10,
    maxHeight: hp(50),
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
    marginTop: 16,
  },
  item: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#1E2026',
    marginVertical: 5,
    borderRadius: 3,
    alignContent: 'center',
    justifyContent: 'center',
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
    marginRight: 10,
    width: 20,
    height: 20,
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
    fontSize:12,
    fontFamily:'MontserratMedium'
  }
});

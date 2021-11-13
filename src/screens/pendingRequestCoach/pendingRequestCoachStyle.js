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
  content: {
    paddingHorizontal: 16,
  },
  alignCenter: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  textInfo: {
    color: '#2CDEE4',
    fontFamily: 'Roboto',
    fontSize: 14,
    marginBottom: 13,
  },
  textUserInfo: {
    color: '#fff',
    fontFamily: 'Roboto',
    fontSize: 14,
    marginBottom: 13,
  },
  item: {
    paddingRight: 30,
    paddingLeft: 16,
    marginVertical: 5,
    flexDirection: 'row',
    height: 50,
    borderRadius: 3,
    alignItems: 'center',
  },
  avatarContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  avatarImage: {
    width: 28,
    height: 28,
    marginRight: 15,
  },
  username: {
    fontFamily: 'RobotoMedium',
    fontSize: 14,
  },
  itemRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  timerText: {
    fontFamily: 'MontserratMedium',
    fontSize: 10,
  },
  processedRequestContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  processedRequestText: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Roboto',
    fontSize: 12,
    marginVertical: 10,
  },
  textColored: {
    color: '#2CDEE4',
    fontFamily: 'MontserratBold',
    fontSize: 20,
  },
});

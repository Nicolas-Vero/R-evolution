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
    paddingHorizontal: 20,
  },
  listContainer: {
    marginTop: 25,
  },
  switchSelectedText: {
    fontFamily: 'MontserratBoldItalic',
  },
  switchText: {
    fontFamily: 'MontserratBoldItalic',
  },
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  alignCenter: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  item: {
    paddingRight: 13,
    paddingLeft: 16,
    marginVertical: 5,
    flexDirection: 'row',
    height: 50,
    borderRadius: 3,
    alignItems: 'center',
    backgroundColor: '#1E2026',
  },
  avatarContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  avatarImage: {
    width: 28,
    height: 28,
    marginRight: 10,
  },
  username: {
    fontFamily: 'RobotoMedium',
    fontSize: 14,
    color: '#FFF',
  },
  itemRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  timerText: {
    fontFamily: 'MontserratMedium',
    fontSize: 10,
    color: '#979797',
  },
});

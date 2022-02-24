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
    flex: 1,
  },
  listContainer: {
    flex: 1,
    marginTop: 15,
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
  // item: {
  //   paddingRight: 13,
  //   paddingLeft: 16,
  //   paddingVertical: 11,
  //   marginVertical: 5,
  //   flexDirection: 'row',
  //   borderRadius: 3,
  //   alignItems: 'center',
  //   backgroundColor: '#1E2026',
  // },
  item: {
    flex: 1,
    borderRadius: 3,
    flexDirection: 'row',
    backgroundColor: '#1E2026',
    width: 'auto',
    marginBottom: 10,
  },
  itemColor: {
    borderRadius: 3,
    width: 5,
  },
  itemContent: {
    width: '100%',
    paddingVertical: 11,
    paddingLeft: 11,
    paddingRight: 30,
    alignItems: 'center',
    flexDirection: 'row',
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
  rightSwip: {
    height: 49,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FD7279',
    width: 57,
  },
  switchSelectedText: {
    fontFamily: 'MontserratBoldItalic',
  },
  switchText: {
    fontFamily: 'MontserratBoldItalic',
  },
  rightSwipText: {
    color: '#fff',
  },
  input: {
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 3,
    height: 45,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 15,
    marginBottom: 25,
  },
});

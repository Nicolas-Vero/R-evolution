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
  background: {
    flex: 1,
  },
  linear: {
    flex: 1,
    borderRadius: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    backgroundColor: '#1E2026',
    width: wp(92),
    height: 54,
    marginBottom: 10,
  },
  content: {
    marginTop: 10,
    alignItems: 'center',
  },
  rightSwip: {
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FD7279',
    width: 75,
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
  itemRow: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  itemMargin: {
    justifyContent: 'center',
    margin: 11,
  },
  itemText: {
    fontFamily: 'Montserrat',
    fontSize: 10,
    color: '#fff',
  },
  createReminderButton: {
    position: 'absolute',
    alignItems: 'flex-end',
    left: wp(84),
    top: hp(50),
  },
  createReminderImage: {
    width: 42,
    height: 42,
  },
});

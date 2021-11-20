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
    marginTop: 10,
    alignItems: 'center',
  },
  rightSwip: {
    height: 54,
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
  item: {
    borderRadius: 3,
    flexDirection: 'row',
    backgroundColor: '#1E2026',
    width: wp(92),
    height: 54,
    marginBottom: 10,
  },
  itemColor: {
    borderRadius: 3,
    width: 5,
  },
  itemContent: {
    marginRight: 30,
    marginLeft: 15,
    alignItems: 'center',
    flexDirection: 'row',
    alignContent: 'center',
  },
  itemLeft: {
    alignItems: 'flex-start',
  },
  itemRight: {
    alignItems: 'flex-end',
  },
  itemRow: {
    justifyContent: 'center',
    flexDirection: 'row',
  },

  itemText: {
    fontFamily: 'MontserratMedium',
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

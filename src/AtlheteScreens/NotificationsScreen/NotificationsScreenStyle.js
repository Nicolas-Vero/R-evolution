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
    flex: 1,
    marginHorizontal: 16,
    marginTop: 10,
    alignItems: 'center',
  },
  rightSwip: {
    height: 57,
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
  item: {
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
  itemLeft: {
    flex: 1,
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
    fontSize: 12,
    color: '#fff',
  },
  itemTextContentNotification: {
    marginRight: 6,
    fontFamily: 'MontserratMedium',
    fontSize: 10,
    color: '#fff',
  },
  itemTextContent: {
    marginRight: 6,
    marginTop: 8,
    fontFamily: 'MontserratMedium',
    fontSize: 10,
    color: '#fff',
  },
  itemTextDate: {
    fontFamily: 'MontserratMedium',
    fontSize: 10,
    color: '#979797',
  },
});

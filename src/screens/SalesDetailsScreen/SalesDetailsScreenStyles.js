import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    marginHorizontal: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoIndexText: {
    color: '#fff',
    fontFamily: 'MontserratBoldItalic',
    fontSize: 9,
  },
  infoValueText: {
    color: '#2CDEE4',
    fontFamily: 'MontserratBoldItalic',
    fontSize: 12,
  },
  flatList: {
    maxHeight: 220,
  },
  item: {
    marginBottom: 10,
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 8,
  },
  itemTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fullName: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'MontserratBold',
  },
  date: {
    color: '#979797',
    fontSize: 10,
    fontFamily: 'Montserrat',
  },
  itemBottom: {
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  offerName: {
    color: '#fff',
    fontFamily: 'Montserrat',
    fontSize: 10,
  },
  amount: {
    color: '#2CDEE4',
    fontFamily: 'Roboto',
    fontSize: 12,
  },
});

export default styles;

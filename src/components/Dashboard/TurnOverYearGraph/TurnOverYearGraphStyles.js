import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  linearContainer: {
    marginTop: 6,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  yearContainer: {
    flexDirection: 'row',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
  headerText: {
    color: '#FFF',
    fontFamily: 'MontserratBoldItalic',
    fontSize: 9,
  },
});

export default styles;

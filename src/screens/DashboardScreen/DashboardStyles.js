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
  page: {
    marginTop: 25,
  },
  scrollView: {
    marginBottom: 150,
  },
  caHeader: {
    marginTop: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  caHeaderText: {
    color: '#FFF',
    fontFamily: 'MontserratBoldItalic',
    fontSize: 9,
  },
  linear: {
    paddingHorizontal: 30,
    paddingVertical: 22,
  },
  linearContainer: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
  },
});

export default styles;

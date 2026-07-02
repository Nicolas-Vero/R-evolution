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
    marginBottom: 200,
  },
  scrollView2: {
    marginBottom: 60,
  },
  caHeader: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  caGoalContainer: {
    flexDirection: 'row',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
  caHeaderText: {
    color: '#FFF',
    fontFamily: 'MontserratBoldItalic',
    fontSize: 9,
  },

  linear: {
    paddingHorizontal: 34,
    paddingVertical: 22,
  },
  linearContainer: {
    marginTop: 6,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
  },
});

export default styles;

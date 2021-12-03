import { Dimensions, StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  contentDialog: {},
  dialog: {
    backgroundColor: '#1E2026',
    borderRadius: 3,
    paddingHorizontal: 16,
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Roboto',
    textAlign: 'center',
    margin: 0,
    padding: 0,
    marginVertical: 30,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  button: {
    marginHorizontal: 5,
    width: 120,
    height: 36,
    backgroundColor: '#fff',
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontSize: 11,
  },
});

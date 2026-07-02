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
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  andText: {
    fontFamily: 'Roboto',
    color: '#fff',
    fontSize: 16,
  },
  dropdownButton: {
    marginVertical: 10,
    width: 100,
    borderRadius: 3,
    height: 38,
  },
  dropdownButtonText: {
    fontSize: 15,
    textAlign: 'left',
    fontFamily: 'Roboto',
  },
  dropdownRowText: {
    fontFamily: 'Roboto',
    color: '#DFDFDF',
    fontSize: 15,
    textAlign: 'left',
    marginLeft: 20,
  },
  dropdownBg: {
    backgroundColor: '#282C3A',
  },
  dropdownRow: {
    height: 40,
    borderBottomColor: '#50525B',
  },
  error: {
    fontSize: 11,
    color: '#FD7279',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2CDEE4',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: 35,
    borderRadius: 3,
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontSize: 12,
  },
});

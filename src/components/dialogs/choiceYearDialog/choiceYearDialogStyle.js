import { Dimensions, StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  dialog: {
    backgroundColor: '#1E2026',
    borderRadius: 3,
    paddingHorizontal: 16,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Roboto',
    textAlign: 'center',
    margin: 0,
    padding: 0,
    marginVertical: 30,
  },
  textColored: {
    color: '#2CDEE4',
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#2CDEE4',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: 34,
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: 'RobotoBold',
    fontSize: 15,
  },
  input: {
    textAlign: 'center',
    backgroundColor: '#fff',
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 6,
    height: 40,
    paddingLeft: 22,
    paddingRight: 22,
    fontSize: 15,
  },
});

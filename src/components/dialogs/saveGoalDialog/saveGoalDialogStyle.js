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
  inputContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    paddingVertical: 8,
    paddingHorizontal: 61,
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: 'RobotoBold',
    fontSize: 15,
  },
  input: {
    textAlign: 'center',
    backgroundColor: '#282C3A',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 6,
    height: 40,
    width: 150,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 15,
  },
  euImage: {
    marginLeft: 15,
    width: 10,
    height: 15,
  },
});

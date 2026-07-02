import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    paddingLeft: 15,
    paddingRight: 15,
    flex: 1,
  },
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    height: 38,
    borderRadius: 3,
    fontSize: 15,
    fontFamily: 'Roboto',
  },
  textArea: {
    backgroundColor: '#FFFFFF',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    height: 180,
    borderRadius: 3,
    fontSize: 15,
    fontFamily: 'Roboto',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    paddingBottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '50%',
    backgroundColor: '#2CDEE4',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: 35,
    borderRadius: 3,
    marginLeft:10
  },
  deletedButton: {
    width: '50%',
    backgroundColor: '#FD7279',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: 35,
    borderRadius: 3,
    marginRight:10
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontSize: 15,
  },
});

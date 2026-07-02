import { StyleSheet, Platform, StatusBar } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
module.exports = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  title: {
    textAlign: 'center',
    marginTop: 64,
    fontFamily: 'RobotoBold',
    fontSize: 16,
    color: '#FFFF',
  },
  diplomasContainerr: {
    marginTop: 50,
    justifyContent: 'center',
  },
  scrollView: {
    maxHeight: 300,
  },
  alignCenter: {
    alignItems: 'center',
  },
  input: {
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    width: widthPercentageToDP(85),
    height: 38,
  },
  addDiplomasContainer: {
    marginLeft: 5,
  },
  itemDiplomas: {
    width: 'auto',
    borderRadius: 25,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#2CDEE4',
  },
  diplomasText: {
    textAlign: 'center',
    fontFamily: 'RobotoBold',
    fontSize: 15,
  },
  removeDiplomas: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: '#FD7279',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    top: -5,
  },
  diplomasDeleteContainer: {
    alignItems: 'flex-end',
    marginTop: 15,
    color: '#2CDEE4',
  },
  diplomasDeleteText: {
    color: '#2CDEE4',
    fontSize: 12,
    fontFamily: 'Roboto',
  },

  errorContainer: {
    alignItems: 'flex-end',
  },
  errorText: {
    marginTop: 5,
    fontSize: 12,
    color: '#FD7279',
  },
  nextButtonText: {
    fontFamily: 'RobotoBold',
    fontSize: 17,
  },
});

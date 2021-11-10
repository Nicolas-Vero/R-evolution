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
  diplomasContainer: {
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
    width: widthPercentageToDP(90),
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderRadius: 3,
    height: 38,
    paddingHorizontal: 15,
    fontSize: 15,
  },
  addDiplomasContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  addDiplomasText: {
    marginLeft: 20,
    fontFamily: 'RobotoBold',
    color: '#FFFFFF',
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
    fontSize: 12,
    color: '#FD7279',
  },
  nextButtonText: {
    fontFamily: 'RobotoBold',
    fontSize: 17,
  },
});

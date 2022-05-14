import { widthPercentageToDP } from 'react-native-responsive-screen';
import { StyleSheet, Platform, StatusBar } from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
flex:1,
  },
  content: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  top: {
    justifyContent: 'flex-start',
    flex: 1,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  title: {
    textAlign: 'center',
    marginTop: 64,
    fontFamily: 'RobotoBold',
    fontSize: 16,
    color: '#FFFF',
  },
  subTitle: {
    marginRight: 15,
    marginTop: 56,
    fontFamily: 'RobotoBold',
    fontSize: 15,
    color: '#FFFFFF',
    width: 'auto',
  },
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  goalContainer: {
    maxHeight: 150,
  },
  goalItem: {
    maxWidth: widthPercentageToDP(25),
    minWidth: widthPercentageToDP(25),
    borderRadius: 25,
    paddingHorizontal: 13,
    paddingVertical: 7,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 7.5,
    borderWidth: 1,
  },
  goalItemText: {
    textAlign: 'center',
    fontFamily: 'RobotoBold',
    fontSize: 15,
  },
  scrollVIewContainer: {
    maxHeight: 100,
  },

  errorText: {
    color: '#FD7279',
    fontSize: 12,
  },
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    width: widthPercentageToDP(93),
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
  },
  deleteGoalContainer: {
    alignItems: 'flex-end',
    marginTop: 15,
    marginBottom: 5,
    marginRight: 5,
    color: '#2CDEE4',
  },
  deleteGoalText: {
    color: '#2CDEE4',
    fontSize: 12,
  },
  addGoalButtonContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginHorizontal: widthPercentageToDP(2),
  },
  addGoalButtonText: {
    fontFamily: 'RobotoBold',
    marginLeft: 10,
    padding: 5,
    color: '#FFFFFF',
  },
});

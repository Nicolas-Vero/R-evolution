import { StyleSheet, Platform, StatusBar } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
module.exports = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginTop: 64,
    fontFamily: 'RobotoBold',
    fontSize: 16,
    color: '#FFFF',
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

  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  selectContainer: {
    marginTop: 60,
    alignItems: 'center',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 50,
    width: widthPercentageToDP(90),
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: 'white',
  },
  dropdownButtonText: {
    textAlign: 'center',
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  dropdownRowText: {
    fontFamily: 'Roboto',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 15,
    height: 50,
    borderRadius: 8,
    borderBottomWidth: 0.25,
    borderBottomColor: '#FFFF',
  },
  dropdownMenuStyle: {
    backgroundColor: '#50525B',
  },
  noWayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noWayCheckBox: {
    paddingLeft: 0,
    marginLeft: 0,
    paddingRight: 0,
    borderWidth: 0,
  },
  noWayText: {
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    fontSize: 15,
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
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
  },
});

import { widthPercentageToDP } from 'react-native-responsive-screen';
import { StyleSheet, Platform, StatusBar } from 'react-native';

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
  subTitle: {
    marginTop: 50,
    fontFamily: 'RobotoBold',
    fontSize: 17,
    color: '#FFFF',
  },
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
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
    borderRadius: 8,
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
    padding: 15,
    height: 50,
    borderRadius: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#FFFF',
  },
  dropdownMenuStyle: {
    borderRadius: 8,
    backgroundColor: '#50525B',
  },
  nextButtonText: {
    fontFamily: 'RobotoBold',
    fontSize: 17,
  },
});

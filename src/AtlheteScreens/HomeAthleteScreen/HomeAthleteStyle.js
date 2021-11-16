import { StyleSheet, Platform, StatusBar } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#2CDEE4',
    borderBottomWidth: 0.3,
    paddingBottom: 20,
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  headerRight: {
    marginLeft: 21,
    marginRight: 10,
  },
  headerRightActivities: {
    marginLeft: 21,
    marginRight: 10,
  },
  headerRightImage: {
    height: 32,
    width: 32,
    resizeMode: 'contain',
  },
  username: {
    marginLeft: 12,
    fontFamily: 'RobotoMedium',
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
  },
  reserveContainer: {
    flex: 1,
  },
  coachName: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 10,
    fontFamily: 'MontserratMedium',
  },
  textColored: {
    color: '#2CDEE4',
  },
  flatlist: {
    marginTop: 22,
  },
  dayContainer: {
    height: 56,
    width: 39,
    marginHorizontal: 5,
    borderColor: '#2CDEE4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  dayTextContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  dayText: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  dayTextNum: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  alignCenter: {
    marginHorizontal: 20,
    alignItems: 'center',
  },
  reserveInfoText: {
    color: '#FFFFFF',
    marginTop: 22,
    marginBottom: 18,
    textAlign: 'center',
    marginHorizontal: 50,
    fontSize: 10,
    fontFamily: 'MontserratMedium',
  },
  reserveItem: {
    marginBottom: 9,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  reserveItemText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'Roboto',
  },
  reserveItemButton: {
    borderColor: '#FFF',
    borderWidth: 2,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 7,
    paddingVertical: 8,
  },
  reserveItemButtonText: {
    color: '#fff',
    fontFamily: 'Roboto',
    fontSize: 11,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#1E2026',
    borderRadius: 20,
    padding: 35,
    height: 200,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  day: {
    height: 80,
    width: 50,
    backgroundColor: '#2D333C',
    margin: 5,
    borderColor: '#2CDEE4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

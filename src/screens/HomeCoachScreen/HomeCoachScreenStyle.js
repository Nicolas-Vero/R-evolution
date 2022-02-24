import { StyleSheet, Platform, StatusBar } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  username: {
    marginLeft: 12,
    fontFamily: 'RobotoMedium',
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
  },
  headerRight: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerRightActivities: {
    marginLeft: 21,
    marginRight: 10,
  },
  headerBorder: {
    marginTop: 14,
    borderBottomColor: '#2CDEE4',
    borderBottomWidth: 0.3,
    marginBottom: 20,
  },
  tabContainer: {
    alignItems: 'center',
  },
  currentDateText: {
    fontFamily: 'MontserratBoldItalic',
    fontSize: 15,
    color: '#FFFFFF',
  },
  headerRightImage: {
    height: 32,
    width: 32,
    resizeMode: 'contain',
  },
  alignCenter: {
    marginHorizontal: 16,
    alignItems: 'center',
  },
  noAppointmentContainer: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  noAppointmentText: {
    fontFamily: 'Roboto',
    fontSize: 15,
    color: '#DFDFDF',
  },
  appointmentLoader: {
    height: hp(22),
    width: wp(94),
    alignItems: 'center',
  },
  calendarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  calendar: {
    paddingVertical: 5,
    paddingBottom: 15,
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    width: wp(90),
  },
  addBookContainer: {
    position: 'absolute',
    bottom: 200,
    right: 10,
    zIndex: 1,
    alignSelf: 'flex-end',
    height: 45,
    justifyContent: 'center',
    alignContent: 'center',
    width: 45,
  },
  addBookImage: {
    height: 45,
    width: 45,
    resizeMode: 'contain',
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
  filterContainer: {
    marginTop: 15,
  },
  filterImage: {
    resizeMode: 'contain',
    width: wp(40),
    height: 50,
    marginLeft: 18,
    marginTop: 8,
  },
  availabilityContainer: {},
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
  image: {
    height: hp(20),
    width: wp(90),
    resizeMode: 'contain',
    marginBottom: 30,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(5),
  },
  input: {
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    height: 38,
    width: wp(92),
    borderRadius: 3,
    paddingLeft: 15,
  },
  forgetPasswordText: {
    marginTop: 15,
    fontFamily: 'Roboto',
    color: '#B9B9BC',
    fontSize: 12,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  button: {
    width: wp(94),
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: 'RobotoBold',
    fontWeight: 'bold',
    fontSize: 17,
  },
  notYetMemberContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  notYetMemberText: {
    fontSize: 12,
    fontFamily: 'Roboto',
    color: '#B9B9BC',
  },
  notYetMemberTextColor: {
    fontSize: 12,
    fontFamily: 'Roboto',
    color: '#2CDEE4',
  },
  dayContainer: {
    height: 30,
    width: 30,
  },
  dateMonth: {
    zIndex: 1,
    position: 'absolute',
    right: -8,
    width: 13,
    height: 13,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateMonthText: {
    fontSize: 8,
    fontFamily: 'Montserrat',
  },
  day: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  dayText: {
    fontSize: 16,
    fontFamily: 'MontserratMedium',
  },
});

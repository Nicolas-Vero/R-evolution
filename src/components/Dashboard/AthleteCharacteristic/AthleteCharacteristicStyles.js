import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  linearContainer: {
    marginTop: 22,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
  },
  linear: {
    paddingHorizontal: 14,
    paddingBottom: 20,
  },
  title: {
    fontSize: 9,
    color: '#fff',
    fontFamily: 'MontserratBoldItalic',
  },
  genderRow: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderIndexText: {
    color: '#fff',
    fontSize: 9,
    fontFamily: 'Roboto',
  },
  genderValueFemaleText: {
    color: '#9F294E',
    marginLeft: 10,
  },
  genderValueMaleText: {
    color: '#2CA1E4',
    marginLeft: 10,
  },
  genderBar: {
    marginBottom: 33,
    marginTop: 10,
    backgroundColor: '#2CA2E4',
    height: 18,
    borderRadius: 10,
  },
  genderBarWife: {
    position: 'absolute',
    top: 3,
    zIndex: 1,
    left: 5,
  },
  gendarBarMale: {
    position: 'absolute',
    top: 3,
    right: 5,
    zIndex: 1,
  },
  gendarBarValueText: {
    color: '#000',
    fontFamily: 'Roboto',
    fontSize: 10,
  },
  row: {
    flexDirection: 'row',
  },
  ageBar: {
    backgroundColor: '#1E2026',
    width: 'auto',
    height: 18,
    borderRadius: 10,
  },
  ageLineContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  ageLineLeftText: {
    color: '#fff',
    fontFamily: 'Roboto',
    fontSize: 10,
  },
  ageLineRightText: {
    textAlign: 'left',
    color: '#979797',
    fontFamily: 'Roboto',
    fontSize: 10,
  },
});

export default styles;

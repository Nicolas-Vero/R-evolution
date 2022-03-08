import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  linearContainer: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
  },
  linear: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  title: {
    fontSize: 9,
    color: '#fff',
    fontFamily: 'MontserratBoldItalic',
  },
  athleteContainer: {
    marginTop: 30,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  athletesInfosRow: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  athleteInfoColor1: {
    width: 5,
    height: 25,
    backgroundColor: '#2CDEE4',
  },
  athleteInfoColor2: {
    width: 5,
    height: 25,
    backgroundColor: '#393637',
  },
  athletesValueText: {
    fontFamily: 'MontserratBoldItalic',
    color: '#fff',
    fontSize: 15,
    marginHorizontal: 10,
  },
  athletesSaleText: {
    fontFamily: 'MontserratBoldItalic',
    color: '#fff',
    fontSize: 8,
  },
  caSalesTextContainer: {
    alignItems: 'center',
  },
  totalAthletesText: {
    color: '#fff',
    fontSize: 22,
    fontFamily: 'MontserratBoldItalic',
  },
  totalAthleteIndexText: {
    marginTop: 3,
    color: '#fff',
    fontSize: 8,
    fontFamily: 'MontserratBoldItalic',
  },
});

export default styles;

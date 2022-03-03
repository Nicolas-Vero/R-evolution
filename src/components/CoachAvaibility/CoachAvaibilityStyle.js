import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2CDEE4',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  text: {
    fontSize: 15,
    color: '#FFF',
    fontFamily: 'Roboto',
  },
  textColored: {
    fontSize: 15,
    color: '#2CDEE4',
    fontFamily: 'Roboto',
  },
  slotsContainer: {
    paddingHorizontal: 16,
  },
  checkBox: {
    zIndex: 1,
    margin: 0,
    padding: 0,
    paddingLeft: 0,
    marginLeft: 0,
  },
  userContainer: {
    backgroundColor: '#2CDEE4',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingVertical: 3,
    borderRadius: 6,
    width: 150,
  },
  username: {
    fontSize: 11,
    fontFamily: 'RobotoMedium',
    marginLeft: 12,
  },
});

export default styles;

import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#1E2026',
    paddingVertical: 15,
    paddingHorizontal: 18,
    marginVertical: 8,
    borderRadius:3
  },
  itemRow: {
    flexDirection: 'row',
    alignItems:'center'
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 20,
  },
  itemText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Roboto',
  },
  image: {
    resizeMode: 'contain',
    height: 60,
    width: '100%',
  },
});

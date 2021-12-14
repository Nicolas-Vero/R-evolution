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
  imageContainer: {
    marginVertical: 8,
  },
  image: {
    resizeMode: 'contain',
    height: 60,
    width: '100%',
  },
});

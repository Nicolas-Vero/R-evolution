import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const { width } = Dimensions.get('window');

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    marginHorizontal: 10,
    marginTop: 30,
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

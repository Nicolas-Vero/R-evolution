import { widthPercentageToDP } from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  imageContainer: { alignItems: 'center', marginTop: 35, flex: 1 },
  image: { width: widthPercentageToDP(80), resizeMode: 'contain' },
});

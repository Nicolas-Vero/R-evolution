import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { withNavigation } from 'react-navigation';

const { width } = Dimensions.get('window');

class HeaderLight extends React.Component {
  render() {
    const { title, navigation } = this.props;
    return (
      <View style={defaultStyle.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/icons/header-back.png')}
            style={defaultStyle.image}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
export default withNavigation(HeaderLight);

const defaultStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  image: { height: 20.54, width: 12.33, resizeMode: 'contain', marginLeft: 0 },
});

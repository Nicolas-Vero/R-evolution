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
import { isIphoneX } from 'react-native-iphone-x-helper';

class Header extends React.Component {
  render() {
    const { title, navigation, disableBackPress } = this.props;
    console.log(disableBackPress);

    if (disableBackPress) {
      return (
        <View style={defaultStyle.containerWithTitle}>
          <View style={defaultStyle.title}>
            <Text style={defaultStyle.text}>{title}</Text>
          </View>
        </View>
      );
    }
    return (
      <View style={defaultStyle.container}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../assets/icons/header-back.png')}
              style={defaultStyle.image}
            />
          </TouchableOpacity>
        </View>
        <View style={defaultStyle.textContainer}>
          <Text style={defaultStyle.text}>{title}</Text>
        </View>
        <View style={{ flex: 1 }} />
      </View>
    );
  }
}
export default withNavigation(Header);

const defaultStyle = StyleSheet.create({
  containerWithTitle: {
    alignItems: 'center',
    marginTop: isIphoneX() ? 40 : 25,
    marginBottom: 20,
  },
  title: { alignItems: 'center' },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: isIphoneX() ? 40 : 25,
    marginBottom: 20,
    marginLeft: 16,
  },
  image: {
    height: 20.54,
    width: 12.33,
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  textContainer: { alignItems: 'center', flex: 6 },
  text: {
    fontStyle: 'italic',
    fontWeight: '800',
    fontSize: 20,
    color: '#FFFFFF',
  },
});

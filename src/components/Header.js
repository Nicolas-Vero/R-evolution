import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Header = ({ title, disableBackPress }) => {
  const navigation = useNavigation(); // Utilisation du hook useNavigation

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
};

export default Header;

const defaultStyle = StyleSheet.create({
  containerWithTitle: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  title: { alignItems: 'center' },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
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

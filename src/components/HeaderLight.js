import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HeaderLight = ({ goBack }) => {
  const navigation = useNavigation();

  const onBackPress = () => {
    if (goBack) {
      goBack();
      return;
    }
    navigation.goBack();
  };

  return (
    <View style={defaultStyle.container}>
      <TouchableOpacity onPress={onBackPress}>
        <Image
          source={require('../../assets/icons/header-back.png')}
          style={defaultStyle.image}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderLight;

const defaultStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  image: {
    height: 20.54,
    width: 12.33,
    resizeMode: 'contain',
    marginLeft: 0,
  },
});

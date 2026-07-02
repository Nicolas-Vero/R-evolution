import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { View, Image, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
import Header from '../../components/Header';
import styles from './AccountScreenStyle';
import AbstractScreenView from '../../components/abstracts/AbstractScreen/AbstractScreenView';
export default class AccountScreenView extends AbstractScreenView {
  render() {
    return (
      <View style={styles.container}>
        <Header title="MON COMPTE" />
        <View style={styles.content}>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={this.controller.onProfilePress}>
              <Image
                source={require('../../../assets/images/Bouton_modifier_mes_informations.png')}
                style={styles.image}></Image>
            </TouchableOpacity>
          </View>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={this.controller.onLogoutPress}>
              <Image
                source={require('../../../assets/images/logout.png')}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={[styles.itemText, { color: '#ffff' }]}>
              Version : 1.0.3
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

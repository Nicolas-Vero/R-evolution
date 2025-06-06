import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, View, Image, Dimensions } from 'react-native';
import Header from '../../components/Header';
import AuthService from '../../services/AuthService';
import styles from './AccountScreenStyle';

const { width } = Dimensions.get('window');

const AccountScreen = () => {
  const navigation = useNavigation();

  // Logout handler
  const handleLogout = async () => {
    await AuthService.logout(true);
    navigation.navigate('Entry');
  };

  // Profile navigation handler
  const handleProfilePress = () => {
    navigation.navigate('ProfileCoachScreen');
  };

  return (
    <View style={styles.container}>
      <Header title="MON COMPTE" />
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={handleProfilePress}>
            <Image
              source={require('../../../assets/images/Bouton_modifier_mes_informations.png')}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={handleLogout}>
            <Image
              source={require('../../../assets/images/logout.png')}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={[styles.itemText, { color: '#ffff' }]}>Version : 1.0.3</Text>
        </View>
      </View>
    </View>
  );
};

export default AccountScreen;

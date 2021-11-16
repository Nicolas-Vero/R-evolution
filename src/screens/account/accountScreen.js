import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Image } from 'react-native';
import Header from '../../components/Header';
import AuthService from '../../services/AuthService';
import styles from './accountStyle';
export default class accountScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  onLogoutPress = async () => {
    await AuthService.removeAuth();
    this.props.navigation.navigate('Entry');
  };

  onProfilePress = async () => {
    this.props.navigation.navigate('profileCoachScreen');
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Header title="MON COMPTE" />
        <View style={styles.content}>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={() => this.onProfilePress()}>
              <Image
                source={require('../../../assets/images/Bouton_modifier_mes_informations.png')}
                style={styles.image}></Image>
            </TouchableOpacity>
          </View>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={() => this.onLogoutPress()}>
              <Image
                source={require('../../../assets/images/logout.png')}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

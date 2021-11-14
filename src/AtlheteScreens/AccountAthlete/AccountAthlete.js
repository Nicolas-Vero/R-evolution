import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width } = Dimensions.get('window');
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/Header';
import {
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { STORAGE } from '../../configs/Constants';
import AuthService from '../../services/AuthService';
import styles from './AccountAthleteStyle';
export default class AccountAthlete extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <LinearGradient
        colors={['#060606', '#2D333C']}
        start={{
          x: 0,
          y: 0,
        }}
        end={{
          x: 1,
          y: 1,
        }}
        style={styles.background}>
        <View>
          <SafeAreaView>
            <Header title="MON COMPTE" />
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <View>
                <TouchableOpacity
                  onPress={() => navigate('myInformationsAthleteScreen')}>
                  <Image
                    source={require('../../../assets/images/Bouton_modifier_mes_informations.png')}
                    style={styles.backgroundContainer}></Image>
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: 'center', marginTop: 10 }}>
                <TouchableOpacity
                  onPress={() =>
                    AuthService.removeAuth().then(() => {
                      navigate('Entry');
                    })
                  }>
                  <Image
                    source={require('../../../assets/images/logout.png')}
                    style={styles.backgroundContainer}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </View>
      </LinearGradient>
    );
  }
}

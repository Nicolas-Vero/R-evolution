import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Image,
  StyleSheet,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '../components/Button';
const { width } = Dimensions.get('window');
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { STORAGE } from '../configs/Constants';

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
                  onPress={() => navigate('MyInformationsAthlete')}>
                  <Image
                    source={require('../../assets/images/Bouton_modifier_mes_informations.png')}
                    style={styles.backgroundContainer}></Image>
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: 'center', marginTop: 10 }}>
                <TouchableOpacity
                  onPress={() =>
                    AsyncStorage.removeItem(STORAGE.HEADERS).then(() => {
                      navigate('Entry');
                    })
                  }>
                  <Image
                    source={require('../../assets/images/logout.png')}
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

const styles = StyleSheet.create({
  backgroundContainer: {
    resizeMode: 'contain',
    width: widthPercentageToDP(94),
    height: 60,
  },
  background: {
    backgroundColor: 'black',
    flex: 1,
  },
});

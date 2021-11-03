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
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { STORAGE } from '../configs/Constants';

export default class Account extends React.Component {
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
        <View >
          <SafeAreaView >
            <Header title="MON COMPTE" />
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <View>
                <TouchableOpacity onPress={() => navigate('MyInformations')}>
                  <Image
                    source={require('../../assets/images/Bouton_modifier_mes_informations.png')}
                    style={styles.backgroundContainer}>
                  </Image>
                </TouchableOpacity>
              </View>
              <View
                style={{alignItems:'center',marginTop:10,  borderColor: 'green' }}>
                <TouchableOpacity onPress={() =>  AsyncStorage.removeItem(STORAGE.HEADERS).then(()=>{navigate('Entry')})}>
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
    width:widthPercentageToDP(94),
    height:60
  },
  background: {
    backgroundColor: 'black',
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.88)',
    alignItems: 'center',
  },
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width,
    height: 49,
    marginTop: 29,
    marginBottom: 49,
    paddingLeft: 16,
    paddingRight: 16,
  },
  title: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 15,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 112,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: width,
    justifyContent: 'space-between',
    marginBottom: 35,
  },
  loginButton: {
    width: 158.4,
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 22,
    borderColor: '#2CDEE4',
    backgroundColor: 'transparent',
  },
  registerButton: {
    width: 158.4,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginLeft: 22,
  },
});

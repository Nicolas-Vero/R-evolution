import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import * as Font from 'expo-font';
//import Button from '../../common/Button';
import Color from '../configs/design/color';
import Header from '../components/Header';
const { width } = Dimensions.get('window');
import { Button } from '../components/Button';
import { LinearGradient } from 'expo-linear-gradient';
import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { withNavigation } from 'react-navigation';
import Constants from 'expo-constants';
const statusBarHeight = Constants.statusBarHeight;
export default class Splash extends React.Component {
  state = {
    offers: [],
    fontsLoaded: false,
  };
  async loadFonts() {
    await Font.loadAsync({
      RobotoBold: require('../../assets/fonts/Roboto-Bold.ttf'),
    });
    this.setState({ fontsLoaded: true });
  }
  componentDidMount() {
    this.loadFonts();
  }
  render() {
    const { navigation } = this.props;
    return (
      <LinearGradient
        colors={['black', '#2D333C']}
        start={{
          x: 0,
          y: 0,
        }}
        end={{
          x: 1,
          y: 1,
        }}
        style={{
          backgroundColor: 'black',
          flex: 1,
        }}>
        <View>
          <SafeAreaView style={styles.droidSafeArea} />
          <View>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                height: 50,
                // backgroundColor: 'white',
                flexDirection: 'row',
                marginLeft: 19.5,
              }}>
              <Image
                source={require('../../assets/icons/header-back.png')}
                style={{ height: 20.54, width: 12.33, resizeMode: 'contain' }}
              />
              <Text style={{ color: 'white', marginLeft: 10, marginTop: 1 }}>
                RETOUR
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginVertical: heightPercentageToDP(25) }}>
            <View>
              <View
                style={{
                  alignItems: 'center',
                  margin: 10,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('LoginAthlete');
                  }}>
                  <View style={styles.bcontainer}>
                    <Text
                      style={{
                        color: '#393637',
                        fontFamily: 'RobotoBold',
                        fontSize: 17,
                      }}>
                      Espace sportif
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Login');
                  }}>
                  <View>
                    <Text
                      style={{
                        marginTop: 50,
                        color: 'white',
                        fontFamily: 'RobotoBold',
                        fontSize: 17,
                        textDecorationLine: 'underline',
                      }}>
                      Espace coach
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  bcontainer: {
    height: 60,
    width: wp(92),
    backgroundColor: '#2CDEE4',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
  },
  droidSafeArea: {
    flex: 1,
    backgroundColor: 'transparent',
    marginTop: 1.2 * statusBarHeight,
  },
  backgroundContainer: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.88)',
    alignItems: 'center',
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
  container: {
    flex: 1,
  },
  form: {
    marginLeft: 70,
    marginRight: 30,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

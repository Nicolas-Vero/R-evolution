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
import { Button } from '../components/Button';
const { width } = Dimensions.get('window');
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';

export default class OffresFormations extends React.Component {
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
            <Header title="OFFRES & FORMATIONS" />
            <View style={{ alignContent: 'center', justifyContent: 'center' }}>
              <View style={{ borderWidth: 3,marginTop:30, borderColor: 'red' }}>
                <TouchableOpacity onPress={() => navigate('Offres')}>
                  <ImageBackground
                    source={require('../../assets/images/entryBackground.png')}
                    style={styles.backgroundContainer}>
                    <View style={styles.container}>
                      <SafeAreaView style={styles.safeArea} />
                      <View style={{ flex: 1 }}>
                        {/* <Image
                    source={require('../../assets/images/entryBackground.png')}
                    style={{ marginTop: 181, marginLeft: 44 , height:100}}
                  /> */}
                        <Text style={styles.title}>
                          “Une évolution est une révolution sans en avoir l’R”
                          {'\n'} -P.-H. Cami
                        </Text>
                      </View>
                      <View style={styles.buttonContainer}></View>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
              <View
                style={{ height:300,marginTop:40, borderWidth: 3, borderColor: 'green' }}>
                <TouchableOpacity onPress={() => navigate('Offres')}>
                  <ImageBackground
                    source={require('../../assets/images/entryBackground.png')}
                    style={styles.backgroundContainer}>
                    <View style={styles.container}>
                      <SafeAreaView style={styles.safeArea} />
                      <View style={{ flex: 1 }}>
                        <Text style={styles.title}>
                          “Une évolution est une révolution sans en avoir l’R”
                          {'\n'} -P.-H. Cami
                        </Text>
                      </View>
                    </View>
                  </ImageBackground>
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
    height: 300,
    resizeMode: 'cover',
    justifyContent: 'center',
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

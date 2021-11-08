import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
const { width } = Dimensions.get('window');
import HeaderSimple from '../components/HeaderSimple';
import { heightPercentageToDP } from 'react-native-responsive-screen';

export default class OffresFormations extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      // <LinearGradient
      //   colors={['#060606', '#2D333C']}
      //   start={{
      //     x: 0,
      //     y: 0,
      //   }}
      //   end={{
      //     x: 1,
      //     y: 1,
      //   }}
      //   style={styles.background}>
        <View style={{backgroundColor:'black', flex:1}} >
          <SafeAreaView style={{height:heightPercentageToDP(70)}} >
            <HeaderSimple title="OFFRES & FORMATIONS" />
            <View style={{ alignContent: 'center', justifyContent: 'center' }}>
              <View >
                <TouchableOpacity onPress={() => navigate('Offres')}>
                  <ImageBackground
                    source={require('../../assets/images/offres.jpg')}
                    style={styles.backgroundContainer}>
                    <View style={styles.container}>
                      <View style={{ flex: 1 ,justifyContent:'flex-end', margin:10, marginRight:90 }}>
                        <Text style={styles.title}>
                          MES OFFRES
                        </Text>
                        <Text style={styles.title2}>
                        Créer et modifie tes offres sur-mesure 
                        </Text>
                      </View>
                      <View style={styles.buttonContainer}></View>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
              <View
                style={{  marginTop:25, }}>
                <TouchableOpacity onPress={() => navigate('Offres')}>
                  <ImageBackground
                    source={require('../../assets/images/Formation.jpg')}
                    style={styles.backgroundContainer2}>
                    <View style={styles.container}>
                      <SafeAreaView style={styles.safeArea} />
                      <View style={{ flex: 1 ,justifyContent:'flex-end',margin:10, marginRight:90}}>
                        <Text style={styles.title}>
                         LES FORMATION
                        </Text>
                        <Text style={styles.title2}>
                        Accède à la plateforme de formation
                        </Text>
                      </View>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </View>
      // </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    height: heightPercentageToDP(50),
    resizeMode: 'cover',
    justifyContent: 'center',
    marginHorizontal:5
  },
  backgroundContainer2: {
    height: heightPercentageToDP(25),
    resizeMode: 'cover',
    justifyContent: 'center',
    marginHorizontal:5
  },
  background: {
    backgroundColor: 'black',
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  title: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 20,
    fontFamily:'MontserratBoldItalic',
    
  },
  title2: {
    color: '#FFFFFF',
    fontFamily:'Montserrat',
    fontSize: 13,
    fontFamily:'MontserratBoldItalic',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: width,
    justifyContent: 'space-between',
    marginBottom: 35,
  },
});

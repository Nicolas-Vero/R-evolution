import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
//import { auth } from '../../api/Register';
//import { Button } from '../components/Button';
//import { Slider } from 'react-native-elements';
const { width } = Dimensions.get('window');
import { TouchableOpacity } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import { FlatList } from 'react-native-gesture-handler';
import { get_coach_offer_by_id } from '../api/Offers';
import Header from '../components/Header';
import { LinearGradient } from 'expo-linear-gradient';
import { DeleteButton, ModifyButton } from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE } from '../configs/Constants';
import { create_paiement } from '../api/Paiement';
const options = [
  { label: 'EN COURS', value: 'EN COURS' },
  { label: 'CATALOGUE', value: 'CATALOGUE' },
];

export default class OffrePaiementMode extends React.Component {
  
  state = {
    offersDetails:{},
    coach_id:'',
  };
  //to do actualiser la liste apres chaque création

  async componentDidMount() {
    var user = await AsyncStorage.getItem(STORAGE.USER);
    user  = JSON.parse(user);
   this.setState({coach_id:user.coach.coach_id})
  }

  render() {
    const offerPurchase = this.props.navigation.state.params.item;
    console.log('offer',offerPurchase);
    list = () => {
      return this.state.items.map((element) => {
        return console.log(element);
      });
    };
    const onRefresh = () => {
      this.setState({ refresh: true });
      console.log(this.state.refresh);
    };
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <SafeAreaView>
        <Header title="LES OFFRES" />
       
        <LinearGradient
                colors={['#101010', '#2D333C']}
                start={{
                  x: 1,
                  y: 1,
                }}
                end={{
                  x: 0,
                  y: 0,
                }}
                style={{
                  flexDirection: 'column',
                  backgroundColor: 'grey',
                  marginBottom: 5,
                  borderRadius:10,
                  paddingLeft: 20,
                  height: 200,
                 // justifyContent:"space-evenly"
                }}>
                <View style={{}}>
                  <Text
                    style={{
                      marginTop: 30,
                      fontWeight: 'bold',
                      fontSize: 20,
                      color: '#FFFFFF',
                      lineHeight: 24,
                    }}>
                    {offerPurchase.title}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{ marginTop: 10, color: '#FFFFFF', fontSize: 10 }}>
                    {offerPurchase.title}
                    {offerPurchase.content}
                  </Text>
                </View>
                <View>
                  <Text style={{ marginTop: 10, color: '#2CDEE4' }}>
                    {offerPurchase.nb_credits} coaching
                  </Text>
                </View>
                <View
                  style={{
                   
                    alignItems:"center",
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop:20
                  }}>
                  <View
                    style={{
                    
                      alignItems:'center',
                      flexDirection: 'row',

                    }}>
                    {/* <ModifyButton
                      title="Choisir cette offre"
                      onPress={() => {
                        navigate('OffreUpdate', {item});
                      }}></ModifyButton> */}
                  </View>
                  <Text
                    style={{
                      fontStyle: 'italic',
                      fontWeight: 'bold',
                      fontSize: 20,
                      color: '#2CDEE4',
                      marginRight:15
                    }}>
                    {offerPurchase.price}€
                  </Text>
                </View>
              </LinearGradient>
              <TouchableOpacity
                  onPress={() => { create_paiement({coach_id:this.state.coach_id,offer_id:offerPurchase.id,installments:1}).then((res)=>{this.props.navigation.navigate('WebPaiement',{item:res.data})})
                  }}>
                  <View style={styles.bcontainer}>
                    <Text >Payer en 1 fois</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    create_paiement({coach_id:this.state.coach_id,offer_id:offerPurchase.id,installments:3}).then((res)=>{this.props.navigation.navigate('WebPaiement',{item:res.data})})
                  }}>
                  <View style={styles.bcontainer}>
                    <Text>Payer en 3 fois</Text>
                  </View>
                </TouchableOpacity>
        </SafeAreaView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: width,
  },
  bcontainer: {
    height: 55,
    width: 400,
    backgroundColor: '#2CDEE4',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    margin:10,
  },
  container: {
    height: 48,
    backgroundColor: '#2CDEE4',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: '#000000',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
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
  container: {
    flex: 1,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 30,
    marginTop: 45,
    marginBottom: 50,
  },
  form: {
    marginLeft: 70,
    marginRight: 30,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
});

import React from 'react';
import { Text, View, SafeAreaView, Dimensions } from 'react-native';

import { TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE } from '../../configs/Constants';
import { create_paiement } from '../../api/Paiement';
import styles from './offerPaiementStyle';
export default class offerPaimentModeScreen extends React.Component {
  state = {
    offersDetails: {},
    coach_id: '',
  };
  //to do actualiser la liste apres chaque création

  async componentDidMount() {
    var user = await AsyncStorage.getItem(STORAGE.USER);
    user = JSON.parse(user);
    this.setState({ coach_id: user.coach.coach_id });
  }

  render() {
    const offerPurchase = this.props.navigation.state.params.item;
    console.log('offer', offerPurchase);
    list = () => {
      return this.state.items.map((element) => {});
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
              borderRadius: 10,
              paddingLeft: 20,
              height: 200,
              // justifyContent:"space-evenly"
            }}>
            <View>
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
              <Text style={{ marginTop: 10, color: '#FFFFFF', fontSize: 10 }}>
                {offerPurchase.title}
                {offerPurchase.content}
              </Text>
            </View>
            <View>
              <Text style={{ marginTop: 10, color: '#2CDEE4' }}>
                {offerPurchase.nb_credits} coachings
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                }}></View>
              <Text
                style={{
                  fontStyle: 'italic',
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: '#2CDEE4',
                  marginRight: 15,
                }}>
                {offerPurchase.price / 100}€
              </Text>
            </View>
          </LinearGradient>
          <TouchableOpacity
            onPress={() => {
              create_paiement({
                coach_id: this.state.coach_id,
                offer_id: offerPurchase.id,
                installments: 1,
              }).then((res) => {
                this.props.navigation.navigate('WebPaiement', {
                  item: res.data,
                });
              });
            }}>
            <View style={styles.bcontainer}>
              <Text>Payer en 1 fois</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              create_paiement({
                coach_id: this.state.coach_id,
                offer_id: offerPurchase.id,
                installments: 3,
              }).then((res) => {
                this.props.navigation.navigate('WebPaiement', {
                  item: res.data,
                });
              });
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

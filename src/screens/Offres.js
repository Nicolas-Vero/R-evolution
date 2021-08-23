import React from 'react';
import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Button,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
//import { auth } from '../../api/Register';
import { Formik } from 'formik';
import { CheckBox } from 'react-native-elements';
//import { Button } from '../components/Button';
import Header from '../components/Header';
//import { Slider } from 'react-native-elements';
import { ElementSlider } from '../components/ElementSlider';
const { width } = Dimensions.get('window');
import { dynamicInput } from '../components/inputs/dynamicInput';
import { dynamicList } from '../components/dynamicList';
import { selectList } from '../components/selectList';
import { LinearGradient } from 'expo-linear-gradient';
import { avatar } from '../components/avatar';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { Entypo } from '@expo/vector-icons';
import { AddButton, DeleteButton, ModifyButton } from '../components/Button';
import { FlatList } from 'react-native-gesture-handler';
import { NavigationEvents } from 'react-navigation';
import { API_URL } from '../configs/Constants';
import axios from 'axios';
import { get_coach_offers } from '../api/Offers';
export default class Offres extends React.Component {
  state = {
    offers: [],
  };
  //to do actualiser la liste apres chaque création

  componentDidMount() {
    get_coach_offers()
      .then((res) => res.data.offers)
      .then((res) => {
        this.setState({ offers: res });
      });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#060606' }}>
        <SafeAreaView style={styles.safeArea} />

        <Header title="Mes offres" />
        <View style={{ paddingLeft: 15, paddingRight: 15, marginBottom: 20 }}>
          <AddButton
            title="créer une nouvelle offre"
            onPress={() => {
              navigate('OffreCreation');
            }}
          />
        </View>
        <View>
          <FlatList
            style={{
            height:600
            }}
            data={this.state.offers}
            extraData={this.state}
            // onRefresh={onRefresh}
            //  refreshing={this.state.refresh}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
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
                    {item.title}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{ marginTop: 10, color: '#FFFFFF', fontSize: 10 }}>
                    {item.title}
                    {item.content}
                  </Text>
                </View>
                <View>
                  <Text style={{ marginTop: 10, color: '#2CDEE4' }}>
                    {item.nb_credits} coaching
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
                    <ModifyButton
                      title="modifier"
                      onPress={() => {
                        navigate('OffreUpdate', {item});
                      }}></ModifyButton>
                    <DeleteButton title="Supprimer"></DeleteButton>
                  </View>
                  <Text
                    style={{
                      fontStyle: 'italic',
                      fontWeight: 'bold',
                      fontSize: 20,
                      color: '#2CDEE4',
                      marginRight:15
                    }}>
                    {item.price}€
                  </Text>
                </View>
              </LinearGradient>
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: width,
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

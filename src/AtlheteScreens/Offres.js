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
const options = [
  { label: 'EN COURS', value: 'EN COURS' },
  { label: 'CATALOGUE', value: 'CATALOGUE' },
];

export default class Offres extends React.Component {
  
  state = {
    offers: [],
    screen: 'EN COURS',
  };
  //to do actualiser la liste apres chaque création

  async componentDidMount() {
   var user = await AsyncStorage.getItem(STORAGE.USER);
    user  = JSON.parse(user);
    console.log('uuser',user);
    get_coach_offer_by_id(4)
      .then((res) => {
        this.setState({ offers: res.data.offers });
      });
  }

  render() {
    list = () => {
      return this.state.items.map((element) => {
        return console.log(element);
      });
    };
    const Item = ({ item, onPress, backgroundColor, textColor }) => (
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.item}>
          {item.content} -- {item.slot}
        </Text>
      </TouchableOpacity>
    );
    const onRefresh = () => {
      this.setState({ refresh: true });
      console.log(this.state.refresh);
    };
    const renderItem = ({ item }) => {
      return <Item stlyes item={item} onPress={(data) => console.log(data)} />;
    };

    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <SafeAreaView>
        <Header title="LES OFFRES" />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
           
              <SwitchSelector
                options={options}
                initial={0}
                onPress={(value) => this.setState({ screen: value })}
                backgroundColor="#1E2026"
                buttonColor="#2CDEE4"
                selectedColor="#1E2026"
                textColor="white"
                borderRadius={10}
                height={50}
                hasPadding
                bold={true}
                fontSize={20}
                textStyle={"italic"}
                valuePadding={3}
                borderColor="#1E2026"
              />
            </View>
            
            {this.state.screen == 'EN COURS' ? (<FlatList></FlatList>) : (
            
            <FlatList
             style={{
               marginTop:10,
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
                    {item.nb_credits} coachings
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
                      title="Choisir cette offre"
                     onPress={()=>{ navigate('OffrePaiementMode', {item})}}></ModifyButton>
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
              </LinearGradient>)}/>)}
        </SafeAreaView>
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

import React from 'react';
import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
//import { auth } from '../../api/Register';
import { Formik } from 'formik';
import { CheckBox } from 'react-native-elements';
import { Button } from '../components/Button';
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
import { AddButton } from '../components/Button';
import { FlatList } from 'react-native-gesture-handler';
import { NavigationEvents } from 'react-navigation';
export default class Offres extends React.Component {
  // state = {
  //   email: '',
  //   password: '',
  //   message: 'Bienvenue',
  //   errorMessage: '',
  //   loading: false,
  // };

  // componentDidMount() {
  //   return axios({
  //     method: 'GET',
  //     url: `${API_URL}text_contents/home_app_info`,
  //   })
  //       .then((res) => res.data.data)
  //       .then((res) => {
  //         if (res.attributes.content.length > 0){
  //           Alert.alert("À propos", res.attributes.content)
  //         }
  //       })
  // }

  // onEmailChange(email) {
  //   this.setState({email})
  // }

  // onPasswordChange(password) {
  //   this.setState({password})
  // }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#060606' }}>
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
          <SafeAreaView style={styles.safeArea} />

          <Header title="Mes offres" />
          <View style={styles.logoContainer}></View>
          <View style={{ paddingLeft: 15, paddingRight: 15 }}>
            <AddButton title="créer une nouvelle offre" onPress={()=>{navigate('OffreCreation') }}/>
          </View>
          <View>
              <FlatList
              />
          </View>
        </LinearGradient>
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

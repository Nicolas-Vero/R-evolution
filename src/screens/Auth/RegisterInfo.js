import React from 'react';
import {Text, View, SafeAreaView, Image, Dimensions, TouchableOpacity, ScrollView, KeyboardAvoidingView, Button} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
// import Container from '../../common/Container';
// import Logo from '../../common/Logo';
import InputField from '../../common/InputField';
//import Icons from '../../configs/design/icon';
//import Button from '../../common/Button';
//import Color from '../../configs/design/color';
import ResponsiveText from '../../common/ResponsiveText';
import AuthInput from '../../common/AuthInput';
import {auth} from '../../api/Register';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class RegisterInfo extends React.Component {

  state = {
    name: '',
    first_name: '',
    telephone: '',
    mail: '',
    password: '',
    confirmPassword: '',
    passwordShow: true,
    confirmPasswordShow: true,
    loading: false,
    message: '',
  };


  onNameChange(name) {
    this.setState({name})
  }

  onfirst_nameChange(first_name) {
    this.setState({first_name})
  }

  onTelephoneChange(telephone) {
    this.setState({telephone})
  }

  onPasswordChange(password) {
    this.setState({password})
  }

  onConfirmPasswordChange(confirmPassword) {
    this.setState({confirmPassword})
  }

  onMailChange(mail) {
    this.setState({mail})
  }


  async onContinuePress() {
    console.log(this);
    if (this.state.password === this.state.confirmPassword) {
      const {name, first_name, telephone, mail,password} = this.state;
      const body = {first_name:first_name, last_name:name,phone:telephone, email: mail, password:password};
      this.setState({loading: true});
      auth(body)
        .then(res => ({
          data: res.data.data,
          headers: {
            access_token: res.headers['access-token'],
            token_type: res.headers['token-name'],
            uid: res.headers['uid'],
            client: res.headers['client'],
        //    expiry: res.headers['expiry'],
          }
        }))
        .then(async res => {
          await AsyncStorage.setItem(STORAGE.USER, JSON.stringify(res.data));
          await AsyncStorage.setItem(STORAGE.HEADERS, JSON.stringify(res.headers));
        })
      .then(res => {
        try {
          this.setState({loading: false});
          this.props.navigation.navigate('AddDegrees');
        } catch (error) {
          console.warn(err)
        }
        })
        .catch(err => {
          this.setState({loading: false});
          if (err.request && err.request.status === 422) {
            this.setState({message: 'Email déjà utilisé, veuillez vous connecter.'});
          } else {
            console.log(err);
            //alert('Please try again. ');
          }
        });
    } else {
      //alert('Passwords don\'t match');
    }
  }

  render() {
    return (

        <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
        <ScrollView style={{
          flex: 1,
        }}>
          <View style={styles.logoContainer}>
            {/* <Logo/> */}
            <ResponsiveText
              style={{
                
                fontSize: '5%',
                alignSelf: 'center',
                marginTop: 20
              }}>{this.state.message}</ResponsiveText>
          </View>

          <View style={styles.form}>
            <AuthInput
              
             // leftIcon={Icons.PersonAuth({width: wp('7%'), height: wp('7%'), tintColor: '#BCBCBC'})}
              keyboardType={'default'}
              placeholder='Nom'
              value={this.state.name}
              onChangeText={this.onNameChange.bind(this)}
            />
            <AuthInput
              
              keyboardType={'default'}
              placeholder='Prénom'
              value={this.state.first_name}
              onChangeText={this.onfirst_nameChange.bind(this)}
            />
            <AuthInput
              
            //  leftIcon={Icons.Mobile({width: wp('5%'), resizeMode: 'contain', tintColor: '#BCBCBC'})}
              keyboardType={'numeric'}
              placeholder='Téléphone'
              value={this.state.telephone}
              onChangeText={this.onTelephoneChange.bind(this)}
            />
            <AuthInput
              
             // leftIcon={Icons.Mail({width: wp('6%'), resizeMode: 'contain', tintColor: '#BCBCBC'})}
              keyboardType={'default'}
              placeholder='Mail'
              value={this.state.mail}
              onChangeText={this.onMailChange.bind(this)}
            />
              
              <AuthInput
                  secureTextEntry={this.state.password}
                  //leftIcon={Icons.LockFill({width: wp('5%'), resizeMode: 'contain', tintColor: '#BCBCBC'})}
                  keyboardType={'default'}
                  placeholder='Mot de passe'
                  value={this.state.password}
                  onChangeText={this.onPasswordChange.bind(this)}
                />
                <TouchableOpacity onPress={() => this.setState({password: !this.state.password})}>
                 {/* {Icons.ShowIcon({width: wp('6%'), resizeMode: 'contain', marginHorizontal: 10})} */}
                </TouchableOpacity>
              <AuthInput
                  secureTextEntry={this.state.confirmPassword}
                 // leftIcon={Icons.LockFill({width: wp('5%'), resizeMode: 'contain', tintColor: '#BCBCBC'})}
                  keyboardType={'default'}
                  placeholder='Confirmation du mot de passe '
                  value={this.state.confirmPassword}
                  onChangeText={this.onConfirmPasswordChange.bind(this)}

                />
                <TouchableOpacity onPress={() => this.setState({confirmPasswordShow: !this.state.confirmPasswordShow})}>
                  {
                  //  Icons.ShowIcon({width: wp('6%'), resizeMode: 'contain', marginHorizontal: 10})
                  }
                </TouchableOpacity>
              
          </View>
            <Button
              //right={Icons.RightArrow({width: wp('6%'), resizeMode: 'contain',})}
              title={'Rejoins-nous'}
              loading={this.state.loading}
              gradientStyle={{
                marginHorizontal: wp('20%')
              }}
              onPress={this.onContinuePress.bind(this)}
            />
         
        </ScrollView>
        </KeyboardAvoidingView>
    );
  }
}
const styles = {
  container: {
    flex: 1,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 45,
    marginBottom: 50,
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: '5%',
    alignSelf: 'center',
    marginTop: 20
  },
  errorMessage: {
    alignSelf: 'center',
    fontSize: '3.5%',
    marginVertical: 10,
  },
}

import React from 'react';
import {AsyncStorage, View, TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Container from '../../common/Container';
import InputField from '../../common/InputField';
import Icons from '../../configs/design/icon';
import Button from '../../common/Button';
import Color from '../../configs/design/color';
import ResponsiveText from '../../common/ResponsiveText';
import {auth} from '../../api/Register';
import {STORAGE} from '../../configs/Constants';

export default class Register extends React.Component {

  state = {
    password: '',
    confirmPassword: '',
    passwordShow: true,
    confirmPasswordShow: true,
    loading: false,
    message: 'Inscrivez-vous'
  };

  onPasswordChange(password) {
    this.setState({password})
  }

  onConfirmPasswordChange(confirmPassword) {
    this.setState({confirmPassword})
  }

  async onContinuePress() {
    if (password === confirmPassword) {
      const {name, firstName, telephone, mail, dpt} = this.props.navigation.state.params;
      const body = {email: mail, password};
      this.setState({loading: true});
      auth(body)
        .then(res => ({
          data: res.data.data,
          headers: {
            access_token: res.headers['access-token'],
            token_type: res.headers['token-name'],
            uid: res.headers['uid'],
            client: res.headers['client'],
            expiry: res.headers['expiry'],
          }
        }))
        .then(async res => {
          await AsyncStorage.setItem(STORAGE.USER, JSON.stringify(res.data));
          await AsyncStorage.setItem(STORAGE.HEADERS, JSON.stringify(res.headers));
        })
        .then(r => {
          update_current_pro({
            first_name: firstName,
            last_name: name,
            phone: telephone,
            dpt: dpt
          }, this.props.navigation)
            .then(res => {
              return res;
            })
            .then(res => {
              this.setState({loading: false});
              this.props.navigation.navigate('AddPhoto');
            })
            .catch(err => {
              console.warn(err)
              //alert("onContinuePress (Register) => " + err.message);
            });
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
        <View style={{
          flex: 1,
          paddingVertical: 30,
          paddingHorizontal: 20
        }}>
          <View style={styles.logoContainer}>
            <Logo/>
            <ResponsiveText
              style={{
                color: Color.Primary,
                fontSize: '5%',
                alignSelf: 'center',
                marginTop: 20
              }}>{this.state.message}</ResponsiveText>
          </View>

          <View style={{flex: 1, justifyContent: 'center'}}>
            <View style={{}}>
              <ResponsiveText style={{color: Color.Placeholder}}>Mot de passe</ResponsiveText>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <InputField
                  secureTextEntry={this.state.passwordShow}
                  containerStyle={{
                    flex: 1,
                    borderRadius: 0,
                    borderWidth: 0,
                    borderBottomWidth: 1,
                    paddingHorizontal: 0,
                  }}
                  leftStyle={{
                    paddingHorizontal: 0,
                    paddingRight: 10
                  }}
                  leftIcon={Icons.LockFill({width: wp('5%'), resizeMode: 'contain', tintColor: '#BCBCBC'})}
                  keyboardType={'default'}
                  placeholder='Mot de passe'
                  value={this.state.password}
                  onChangeText={this.onPasswordChange.bind(this)}
                />
                <TouchableOpacity onPress={() => this.setState({passwordShow: !this.state.passwordShow})}>
                  {Icons.ShowIcon({width: wp('6%'), resizeMode: 'contain', marginHorizontal: 10})}
                </TouchableOpacity>
              </View>
            </View>
            <View style={{}}>
              <ResponsiveText style={{color: Color.Placeholder}}>Mot de passe</ResponsiveText>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <InputField
                  secureTextEntry={this.state.confirmPasswordShow}
                  containerStyle={{
                    flex: 1,
                    borderRadius: 0,
                    borderWidth: 0,
                    borderBottomWidth: 1,
                    paddingHorizontal: 0,
                  }}
                  leftStyle={{
                    paddingHorizontal: 0,
                    paddingRight: 10
                  }}
                  leftIcon={Icons.LockFill({width: wp('5%'), resizeMode: 'contain', tintColor: '#BCBCBC'})}
                  keyboardType={'default'}
                  placeholder='Confirmez'
                  value={this.state.confirmPassword}
                  onChangeText={this.onConfirmPasswordChange.bind(this)}

                />
                <TouchableOpacity onPress={() => this.setState({confirmPasswordShow: !this.state.confirmPasswordShow})}>
                  {
                    Icons.ShowIcon({width: wp('6%'), resizeMode: 'contain', marginHorizontal: 10})
                  }
                </TouchableOpacity>
              </View>
            </View>
            <Button
              //right={Icons.RightArrow({width: wp('6%'), resizeMode: 'contain',})}
              text={'Continuer →'}
              loading={this.state.loading}
              gradientStyle={{
                marginHorizontal: wp('20%')
              }}
              onPress={this.onContinuePress.bind(this)}
            />
          </View>
        </View>
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
        marginLeft: 70,
        marginRight: 30,
    },
    textInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoText: {
        color: Color.Primary,
        fontSize: '5%',
        alignSelf: 'center',
        marginTop: 20
    },
};

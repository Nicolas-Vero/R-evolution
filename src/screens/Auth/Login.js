import React from 'react';
import {AsyncStorage, View, TouchableOpacity, KeyboardAvoidingView, ScrollView, Button} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Container from '../../common/Container';
import InputField from '../../common/InputField';
import Icons from '../../configs/design/icon';
//import Button from '../../common/Button';
import Color from '../../configs/design/color';
import ResponsiveText from '../../common/ResponsiveText';
import {sign_in} from '../../api/Login';
export default class Login extends React.Component {

  state = {
    email: '',
    password: '',
    message: 'Bienvenue',
    errorMessage: '',
    loading: false,
  };

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


  onEmailChange(email) {
    this.setState({email})
  }

  onPasswordChange(password) {
    this.setState({password})
  }

  async onLoginPress() {
    const {email, password} = this.state;
    const body = {email, password};
   console.log(body);
    this.setState({loading: true});
    sign_in(body)
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
        try {
          await AsyncStorage.setItem(STORAGE.USER, JSON.stringify(res.data));
          await AsyncStorage.setItem(STORAGE.HEADERS, JSON.stringify(res.headers));
          this.setState({loading: false});
          this.props.navigation.navigate('DashboardStack')
        } catch (err) {
          this.setState({loading: false});
          //alert('Please try again. ');
          console.warn(err)
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          Alert.alert("Login failed", error.response.data.errors[0])
        }
        this.setState({loading: false});
      })
      .finally(() => {
        this.setState({password: ""});
      });
  }

  getErrorMessage() {
    if (this.state.errorMessage !== '')
      return <ResponsiveText
        style={{alignSelf: 'center', fontSize: '3.5%', color: Color.Primary}}>
        {this.state.errorMessage}
      </ResponsiveText>
    return <ResponsiveText
      style={{
        alignSelf: 'center',
        fontSize: '3.5%',
        opacity: 0
      }}>
      Hidden Text
    </ResponsiveText>

  }

  render() {
    return (
        <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
          <ScrollView style={styles.container}>
          <View style={styles.logoContainer}>
            {/* <Logo/> */}
            <ResponsiveText style={styles.logoText}>{this.state.message}</ResponsiveText>
          </View>
          {this.getErrorMessage()}
          <View style={{paddingVertical: 20}} />
          <View style={styles.form}>
            <InputField
            //={Icons.PersonAuth({width: wp('5%'), resizeMode: 'contain', tintColor: '#BCBCBC'})}
              keyboardType={'default'}
              placeholder='Identifiant'
              value={this.state.email}
              onChangeText={this.onEmailChange.bind(this)}
            />
            <InputField
             // leftIcon={Icons.Lock({width: wp('5%'), resizeMode: 'contain'})}
              keyboardType={'default'}
              placeholder='Mot de passe'
              value={this.state.password}
              secureTextEntry={true}
              onChangeText={this.onPasswordChange.bind(this)}
            />
            <Button
              style={{width: '100%'}}
              loading={this.state.loading}
              title={'Connexion'}
              gradientStyle={{
                marginHorizontal: 30
              }}
              onPress={this.onLoginPress.bind(this)}
            />
            <Button
              style={{width: '100%'}}
              title={'Je m’inscris'}
              gradientStyle={{
                marginHorizontal: 30,
                borderColor: Color.Secondary,
                borderWidth: 1
              }}
              colors={['#fff', '#fff', '#fff']}
              textStyle={{
                color: Color.Secondary,
              }}
              onPress={() => this.props.navigation.navigate('RegisterInfo')}
            />
            <View style={{marginVertical: 5}}/>
            {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('ResetPassword')}>
              <Text style={{color:Color.Primary}}>Mot de passe oublié ?</Text>
            </TouchableOpacity>
            <View style={{marginVertical: 5}}/>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Support')}>
              <Text style={{color: Color.Primary}}>Besoin d'aide ?</Text>
            </TouchableOpacity> */}
          </View>

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

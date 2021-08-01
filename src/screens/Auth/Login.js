import React from 'react';
import {AsyncStorage, View, ImageBackground,SafeAreaView,StyleSheet,Dimensions, Image,TextInput,Text} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Container from '../../common/Container';
import InputField from '../../common/InputField';
import Icons from '../../configs/design/icon';
//import Button from '../../common/Button';
import Color from '../../configs/design/color';
import ResponsiveText from '../../common/ResponsiveText';
import {sign_in} from '../../api/Login'; 
import Header from '../../components/Header';
const {width} = Dimensions.get('window');
import {Formik} from 'formik';
import {Button} from '../../components/Button';
import LinearGradient from 'react-native-linear-gradient';
import { color } from 'react-native-elements/dist/helpers';
export default class Login extends React.Component {

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

  async onLoginPress(values) {
    const {email, password}=values;
    const body = {email, password};
    console.log(values);
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
          this.props.navigation.navigate('Dashboard')
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
     
      <View style={{flex: 1, backgroundColor: '#060606'}}>
           
         
      <SafeAreaView style={styles.safeArea} />
      
      <Header title="inscription" />
      <View style={styles.logoContainer}>
      <Image source={require('../../../assets/images/logo.png')}  
                style={styles.image}
            ></Image>
      </View>
      
        <View style={{paddingLeft: 15, paddingRight: 15}}>

     
      <Formik
                initialValues={{
                  email: '',
                  password: '',         
                }}
                onSubmit={(values,{onLoginPress}) => onLoginPress(values)}>
                {({handleChange, handleBlur, handleSubmit, setFieldValue, values}) => (
                  <View>
                    {/* {console.log(values)} */}

                    <View style={{marginBottom: 15}}>
                      <TextInput
                        placeholder="Email"
                        style={{backgroundColor: '#FFFFFF', paddingTop: 10, paddingBottom: 10, paddingLeft: 15, paddingRight: 15}}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.mail}
                      />
                    </View>
                    <View style={{marginBottom: 15}}>
                      <TextInput
                        placeholder="Mot de passe"
                        style={{backgroundColor: '#FFFFFF', paddingTop: 10, paddingBottom: 10, paddingLeft: 15, paddingRight: 15}}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                      />
                    </View>
                    
                    <View style={{alignItems: 'center',paddingTop: 10, paddingBottom: 10, paddingLeft: 15, paddingRight: 15}}>
                      <Button  style={{paddingTop: 10, paddingBottom: 10, paddingLeft: 15, paddingRight: 15}} loading={false} title ='Se connecter' onPress={this.onLoginPress.bind()}/>
                    </View>
                    <View>
                    <Text style={{color:'#FFFFFF'}}>Pas encore membre?  </Text>
                    </View>
                  </View>
                )}
              </Formik>
              </View>
            </View>


        // <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
        //   <ScrollView style={styles.container}>
        //   <View style={styles.logoContainer}>
        //     {/* <Logo/> */}
        //     <ResponsiveText style={styles.logoText}>{this.state.message}</ResponsiveText>
        //   </View>
        //   {this.getErrorMessage()}
        //   <View style={{paddingVertical: 20}} />
        //   <View style={styles.form}>
        //     <InputField
        //     //={Icons.PersonAuth({width: wp('5%'), resizeMode: 'contain', tintColor: '#BCBCBC'})}
        //       keyboardType={'default'}
        //       placeholder='Identifiant'
        //       value={this.state.email}
        //       onChangeText={this.onEmailChange.bind(this)}
        //     />
        //     <InputField
        //      // leftIcon={Icons.Lock({width: wp('5%'), resizeMode: 'contain'})}
        //       keyboardType={'default'}
        //       placeholder='Mot de passe'
        //       value={this.state.password}
        //       secureTextEntry={true}
        //       onChangeText={this.onPasswordChange.bind(this)}
        //     />
        //     <Button
        //       style={{width: '100%'}}
        //       loading={this.state.loading}
        //       title={'Connexion'}
        //       gradientStyle={{
        //         marginHorizontal: 30
        //       }}
        //       onPress={this.onLoginPress.bind(this)}
        //     />
        //     <Button
        //       style={{width: '100%'}}
        //       title={'Je m’inscris'}
        //       gradientStyle={{
        //         marginHorizontal: 30,
        //         borderColor: Color.Secondary,
        //         borderWidth: 1
        //       }}
        //       colors={['#fff', '#fff', '#fff']}
        //       textStyle={{
        //         color: Color.Secondary,
        //       }}
        //       onPress={() => this.props.navigation.navigate('RegisterInfo')}
        //     />
        //     <View style={{marginVertical: 5}}/>
        //     {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('ResetPassword')}>
        //       <Text style={{color:Color.Primary}}>Mot de passe oublié ?</Text>
        //     </TouchableOpacity>
        //     <View style={{marginVertical: 5}}/>
        //     <TouchableOpacity onPress={() => this.props.navigation.navigate('Support')}>
        //       <Text style={{color: Color.Primary}}>Besoin d'aide ?</Text>
        //     </TouchableOpacity> */}
        //   </View>

        // </ScrollView>
        // </KeyboardAvoidingView>
    );
  }
}

  const styles = StyleSheet.create({
    image:{

      width: width,
    },
    backgroundContainer: {    
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    container: {flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.88)', alignItems: 'center'},
    // safeArea: {
    //   paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    // },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: width,
      height: 49,
      marginTop: 29,
      marginBottom: 49,
      paddingLeft: 16, 
      paddingRight: 16
    },
    title: {
        color: "#FFFFFF", 
        fontWeight: '500', 
        fontSize: 15, 
        fontStyle: 'italic',
        textAlign: 'center', 
        marginTop: 112
    },
    buttonContainer: {
        flexDirection: 'row', 
        width: width, 
        justifyContent: 'space-between',
        marginBottom: 35
    },
    loginButton: {
        width: 158.4, 
        height: 48, 
        borderRadius: 10,
        borderWidth: 1, 
        marginRight: 22,
        borderColor: '#2CDEE4',
        backgroundColor: 'transparent'
    },
    registerButton: {
        width: 158.4, 
        height: 48, 
        backgroundColor: '#FFFFFF', 
        borderRadius: 10,
         marginLeft: 22
    },
    container: {
        flex: 1,
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft:30,
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
        fontSize: 5,
        alignSelf: 'center',
        marginTop: 20
    },
});

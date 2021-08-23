import React from 'react';
import {View, SafeAreaView,StyleSheet,Dimensions, Image,TextInput,Text} from 'react-native'
//import Button from '../../common/Button';
import Color from '../../configs/design/color';
import ResponsiveText from '../../common/ResponsiveText';
import {sign_in} from '../../api/Login'; 
import Header from '../../components/Header';
const {width} = Dimensions.get('window');
import {Formik} from 'formik';
import { STORAGE } from '../../configs/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from '../../components/Button';
export default class Login extends React.Component {

  async onLoginPress(values) {
   // const {email, password}=values;
    const {email, password}={email:"blakonino@gmail.com", password:"abcd"};
    const body = {email, password};
    console.log(values);
    this.setState({loading: true});
    sign_in(body)
      .then( res => ({
        
         data: res.data,
         headers: {
          Authorization:'Bearer ' + res.data.token
        }
        
      }))
      .then( async res => {
        try {
          console.log('toto',res)
          await AsyncStorage.setItem(STORAGE.USER, JSON.stringify(res.data));
          await AsyncStorage.setItem(STORAGE.HEADERS, JSON.stringify(res.headers));
          this.setState({loading: false});
          this.props.navigation.navigate('Dashboard')
        } catch (err) {
          this.setState({loading: false});
          //alert('Please try again. ');
          console.warn(err)
        }
      }).then(async()=>{
        try {
         const test = await AsyncStorage.getItem(STORAGE.HEADERS);
         console.log('*******',test);
        } catch (error) {
          
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
                        autoCapitalize='none'
                        onBlur={handleBlur('email')}
                        value={values.mail}
                      />
                    </View>
                    <View style={{marginBottom: 15}}>
                      <TextInput
                        placeholder="Mot de passe"
                        style={{backgroundColor: '#FFFFFF', paddingTop: 10, paddingBottom: 10, paddingLeft: 15, paddingRight: 15}}
                        onChangeText={handleChange('password')}
                        autoCapitalize='none'
                        onBlur={handleBlur('password')}
                        value={values.password}
                      />
                    </View>
                    
                    <View style={{alignItems: 'center',paddingTop: 10, paddingBottom: 10, paddingLeft: 15, paddingRight: 15}}>
                      <Button  style={{paddingTop: 10, paddingBottom: 10, paddingLeft: 15, paddingRight: 15}} loading={false} title ='Se connecter' onPress={()=>{this.onLoginPress(values)}}/>
                    </View>
                    <View>
                    <Text style={{color:'#FFFFFF'}}>Pas encore membre?  </Text>
                    </View>
                  </View>
                )}
              </Formik>
              </View>
            </View>
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

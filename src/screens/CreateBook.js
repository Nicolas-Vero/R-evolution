import React from 'react';
import {
  View,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import SelectDropdown from 'react-native-select-dropdown';
//import { auth } from '../../api/Register';
import { Formik } from 'formik';
import { CheckBox, Text } from 'react-native-elements';
import { Button } from '../components/Button';
import Header from '../components/Header';
import { Right } from 'native-base';
import { ScrollView } from 'react-native';
//import { Slider } from 'react-native-elements';
const { width } = Dimensions.get('window');
export default class CreateBook extends React.Component {
  state = {
    type: 'Coaching',
    countries: ['Egypt', 'Canada', 'Australia', 'Ireland'],
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

  // onEmailChange(email) {
  //   this.setState({email})
  // }

  // onPasswordChange(password) {
  //   this.setState({password})
  // }

  async onLoginPress(values) {
    console.log(values);
  }

  getErrorMessage() {
    if (this.state.errorMessage !== '')
      return (
        <ResponsiveText style={{ alignSelf: 'center', fontSize: '3.5%' }}>
          {this.state.errorMessage}
        </ResponsiveText>
      );
    return (
      <ResponsiveText
        style={{
          alignSelf: 'center',
          fontSize: '3.5%',
          opacity: 0,
        }}>
        Hidden Text
      </ResponsiveText>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#060606' }}>
        <SafeAreaView style={styles.safeArea} />

        <Header title="AJOUTER UN RDV" />

        <View style={{ paddingLeft: 15, paddingRight: 15 }}>
          <Formik
            initialValues={{
              type: 'Coaching',
              title: '',
              content: '',
              nbSeance: '',
              price: '',
              gender: 'male',
              first_name: '',
              last_name: '',
              email: '',
              phone: '',

            }}
            onSubmit={(values, { onLoginPress }) => onLoginPress(values)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
            }) => (
              <View>
                {/* {console.log(values)} */}
                <View style={{ flexDirection: 'column', marginBottom: 15 }}>
                  <CheckBox
                    containerStyle={{
                      paddingLeft: 0,
                      marginLeft: 0,
                      backgroundColor: 'transparent',
                      borderWidth: 0,
                    }}
                    title="Mes athlètes actif"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={values.type === 'Actifs'}
                    value={values.type}
                    onPress={() => {
                      setFieldValue('type', 'Actifs'),
                        this.setState({ type: 'Actifs' });
                    }}
                  />
                  {this.state.type == 'Actifs' ? (
                    <View>
                      <SelectDropdown
                        data={this.state.countries}
                        onSelect={(selectedItem, index) => {
                          console.log(selectedItem, index);
                        }}
                      />
                    </View>
                  ) : null}
                  <CheckBox
                    containerStyle={{
                      paddingLeft: 0,
                      marginLeft: 0,
                      backgroundColor: 'transparent',
                      borderWidth: 0,
                    }}
                    title="Mes athlètes inactifs"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={values.type.toString() === 'Inactifs'}
                    value={values.type}
                    onPress={() => {
                      setFieldValue('type', 'Inactifs'),
                        this.setState({ type: 'Inactifs' });
                    }}
                  />
                  {this.state.type == 'Inactifs' ? (
                    <View>
                      <SelectDropdown
                        data={this.state.countries}
                        onSelect={(selectedItem, index) => {
                          console.log(selectedItem, index);
                        }}
                      />
                    </View>
                  ) : null}

                  <CheckBox
                    containerStyle={{
                      paddingLeft: 0,
                      marginLeft: 0,
                      backgroundColor: 'transparent',
                      borderWidth: 0,
                    }}
                    title="Prospect"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={values.type.toString() === 'Prospect'}
                    value={values.type}
                    onPress={() => {
                      setFieldValue('type', 'Prospect'),
                        this.setState({ type: 'Prospect' });
                    }}
                  />
                  {this.state.type == 'Prospect' ? (
                      <ScrollView style={{maxHeight:450}} >
                    <View>
                      <View style={{ marginBottom: 15 }}>
                        <SelectDropdown
                          data={this.state.countries}
                          onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index);
                          }}
                        />
                      </View>
                      <View style={{ marginBottom: 10 }}>
                        <Text>Ou ajouter un Prospect</Text>
                      </View>

                      <View>
                      <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                      <CheckBox
                        containerStyle={{
                          paddingLeft: 0,
                          marginLeft: 0,
                          backgroundColor: 'transparent',
                          borderWidth: 0,
                        }}
                        title="M"
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checked={values.gender.toString() === 'male'}
                        value={values.gender}
                        onPress={() => setFieldValue('gender', 'male')}
                      />
                      <CheckBox
                        containerStyle={{
                          paddingLeft: 0,
                          marginLeft: 0,
                          backgroundColor: 'transparent',
                          borderWidth: 0,
                        }}
                        title="Mme"
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checked={values.gender === 'female'}
                        value={values.gender}
                        onPress={() => setFieldValue('gender', 'female')}
                      />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                      <TextInput
                        placeholder="Nom"
                        style={{
                          backgroundColor: '#FFFFFF',
                          paddingTop: 10,
                          paddingBottom: 10,
                          paddingLeft: 15,
                          paddingRight: 15,
                        }}
                        onChangeText={handleChange('first_name')}
                        onBlur={handleBlur('first_name')}
                        value={values.first_name}
                      />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                      <TextInput
                        placeholder="Prénom"
                        style={{
                          backgroundColor: '#FFFFFF',
                          paddingTop: 10,
                          paddingBottom: 10,
                          paddingLeft: 15,
                          paddingRight: 15,
                        }}
                        onChangeText={handleChange('last_name')}
                        onBlur={handleBlur('last_name')}
                        value={values.last_name}
                      />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                      <TextInput
                        placeholder="Email"
                        style={{
                          backgroundColor: '#FFFFFF',
                          paddingTop: 10,
                          paddingBottom: 10,
                          paddingLeft: 15,
                          paddingRight: 15,
                        }}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                      />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                      <TextInput
                        placeholder="Téléphone"
                        style={{
                          backgroundColor: '#FFFFFF',
                          paddingTop: 10,
                          paddingBottom: 10,
                          paddingLeft: 15,
                          paddingRight: 15,
                        }}
                        onChangeText={handleChange('phone')}
                        onBlur={handleBlur('phone')}
                        value={values.phone}
                      />
                      
                    </View>
                    <View style={{ marginBottom: 15, }}>
                    <SelectDropdown
                        data={this.state.countries}
                        onSelect={(selectedItem, index) => {
                          console.log(selectedItem, index);
                        }}
                      />
                      
                    </View>
                        <View style={{ marginBottom: 15 }}>
                        
                          <TextInput
                            placeholder="Description"
                            style={{
                              backgroundColor: '#FFFFFF',
                              paddingTop: 10,
                              paddingBottom: 10,
                              paddingLeft: 15,
                              paddingRight: 15,
                              height: 180,
                            }}
                            onChangeText={handleChange('Description')}
                            onBlur={handleBlur('Description')}
                            value={values.password}
                          />
                        </View>
                      </View>
                    </View>
                    </ScrollView>
                  ) : null}
                </View>

                <View
                  style={{
                    marginTop: 100,
                  }}>
                  <Button
                    style={{
                      paddingTop: 10,
                      paddingBottom: 10,
                      paddingLeft: 15,
                      paddingRight: 15,
                    }}
                    loading={false}
                    title="Créer loffre"
                    onPress={console.log(values)}
                  />
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
  image: {
    width: width,
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
  text: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFFFFF',
    lineHeight: 24,
  },
  euro: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 30,
    color: '#FFFFFF',
    marginLeft: 5,
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

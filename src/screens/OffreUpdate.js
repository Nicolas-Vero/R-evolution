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
//import { auth } from '../../api/Register';
import { Formik } from 'formik';
import { CheckBox, Text } from 'react-native-elements';
import { Button } from '../components/Button';
import Header from '../components/Header';
import { Right } from 'native-base';
import { UpdateOffer } from '../api/Offers';
//import { Slider } from 'react-native-elements';
const { width } = Dimensions.get('window');
export default class OffreUpdate extends React.Component {



  state = {
    type: 'Coaching',
  };

  async onLoginPress(values) {
    console.log(values);
  }

  Update(values){
    try {
      UpdateOffer(values).then(
        this.props.navigation.navigate('Offres')
      )
    } catch (error) {
      this.setState({loading: false});
          //alert('Please try again. ');
          console.warn(error)
    }


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
    const initialValues =this.props.navigation.state.params.item
    console.log(initialValues)
    return (
      <View style={{ flex: 1, backgroundColor: '#060606' }}>
        <SafeAreaView style={styles.safeArea} />

        <Header title="Mettre à jour une offre" />

        <View style={{ paddingLeft: 15, paddingRight: 15 }}>
          <Formik
            initialValues={{
              type: initialValues.type,
              title: initialValues.title,
              content: initialValues.content,
              nb_credits: initialValues.nb_credits.toString(),
              price:initialValues.price.toString(),
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
                    title="Coaching"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={values.type.toString() === 'Coaching'}
                    value={values.type}
                    onPress={() => {
                      setFieldValue('type', 'Coaching'),
                        this.setState({ type: 'Coaching' });
                    }}
                  />
                  <CheckBox
                    containerStyle={{
                      paddingLeft: 0,
                      marginLeft: 0,
                      backgroundColor: 'transparent',
                      borderWidth: 0,
                    }}
                    title="Autre coaching"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={values.type === 'Autre'}
                    value={values.type}
                    onPress={() => {
                      setFieldValue('type', 'Autre'),
                        this.setState({ type: 'Autre' });
                    }}
                  />
                </View>
                <View style={{ marginBottom: 15 }}>
                  <TextInput
                    placeholder="Title"
                    style={{
                      backgroundColor: '#FFFFFF',
                      paddingTop: 10,
                      paddingBottom: 10,
                      paddingLeft: 15,
                      paddingRight: 15,
                    }}
                    onChangeText={handleChange('title')}
                    onBlur={handleBlur('title')}
                    value={values.title}
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
                    onChangeText={handleChange('content')}
                    onBlur={handleBlur('content')}
                    value={values.content}
                  />
                </View>
                {this.state.type == 'Coaching' ? (
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginBottom: 15 }}>
                      <Text style={styles.text}>Nombre de séance</Text>
                      <TextInput
                        placeholder="Nombre de séances"
                        style={{
                          backgroundColor: '#FFFFFF',
                          paddingTop: 10,
                          paddingBottom: 10,
                          paddingLeft: 15,
                          paddingRight: 15,
                          marginRight: 90,
                          width: wp(20),
                        }}
                        onChangeText={handleChange('nb_credits')}
                        onBlur={handleBlur('nb_credits')}
                        value={values.nb_credits}
                      />
                    </View>

                    <View style={{ marginBottom: 15, marginLeft: 80 }}>
                      <Text style={styles.text}>Prix</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <TextInput
                          placeholder="Prix"
                          style={{
                            backgroundColor: '#FFFFFF',
                            paddingTop: 10,
                            paddingBottom: 10,
                            paddingLeft: 15,
                            paddingRight: 15,

                            width: wp(20),
                          }}
                          onChangeText={handleChange('price')}
                          onBlur={handleBlur('price')}
                          value={values.price}
                        />
                        <Text style={styles.euro}>€</Text>
                      </View>
                    </View>
                  </View>
                ) : (<View style={{ marginBottom: 15, }}>
                    <Text style={styles.text}>Prix</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <TextInput
                        placeholder="Prix"
                        style={{
                          backgroundColor: '#FFFFFF',
                          paddingTop: 10,
                          paddingBottom: 10,
                          paddingLeft: 15,
                          paddingRight: 15,

                          width: wp(20),
                        }}
                        onChangeText={handleChange('price')}
                        onBlur={handleBlur('price')}
                        value={values.password}
                      />
                      <Text style={styles.euro}>€</Text>
                    </View>
                  </View>)}

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
                    title="Mettre a jour l'offre "
                    onPress={()=>{this.Update(values)}}
                  />
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

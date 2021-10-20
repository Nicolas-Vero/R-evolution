import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Platform,
  Dimensions,
  Keyboard,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { Button } from '../components/Button';
import Header from '../components/Header';
const { width } = Dimensions.get('window');
import { LinearGradient } from 'expo-linear-gradient';
import * as Yup from 'yup';
import { Formik, FieldArray, Field } from 'formik';
import { FontAwesome } from '@expo/vector-icons';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

import { ScrollView } from 'react-native-gesture-handler';
export default class dynamicInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 'initial',
      // passItem: this.props.navigation.state.params.item,
      arrayofdiplomas: [],
    };
  }
  render() {
    const passItem = this.props.navigation.state.params.item;
    const { navigation } = this.props;
    console.log('passitem', passItem);
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
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
          <SafeAreaView onPress={Keyboard.dismiss} style={styles.safeArea}>
            <Header title="Let' go" />
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../../assets/images/Group_1.png')}
                style={{ width: widthPercentageToDP(80) }}
              />
            </View>

            <View style={{ paddingLeft: 16, paddingRight: 16, flex: 1 }}>
              <Formik
                initialValues={{
                  diplomas: [],
                }}
                onSubmit={(values) => {
                  const item = { ...passItem, ...values };
                  navigation.navigate('ElementSlider', { item:item})
                  console.log(item);
                }}
                validationSchema={Yup.object().shape({
                  diplomas: Yup.array().min(1).required('Requis'),
                })}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  values,
                  setFieldTouched,
                  touched,
                  errors,
                  isValid,
                  validate,
                }) => (
                  <View>
                    <Field name="diplomas" id="diplomas" validate={validate}>
                      {({
                        field,
                        meta,
                        form: {
                          touched,
                          errors,
                          isSubmitting,
                          setFieldTouched,
                        },
                      }) => {
                        return (
                          console.log(errors),
                          <View style={{ height: heightPercentageToDP(75) }}>
                            <View
                              style={{
                                alignItems: 'center',
                                marginTop: 135,
                              }}>
                              <Text
                                style={{
                                  fontFamily: 'RobotoBold',
                                  fontSize: 20,
                                  color: '#FFFF',
                                }}>
                                DIPLÔME(S)
                              </Text>
                            </View>
                            <ScrollView>
                              <View style={styles.container}>
                                <FieldArray
                                  name="diplomas"
                                  render={(arrayhelper) => (
                                    <View style={styles.container2}>
                                      {field.value.map(
                                        (fields, index) => (
                                          console.log(field),
                                          (
                                              
                                            <ScrollView>
                                              <View
                                                style={{
                                                  alignContent: 'center',
                                                  maxHeight: 250,
                                                  backgroundColor: 'red',
                                                }}
                                                key={index}>
                                                <TextInput
                                                  placeholder="Ajoute ton objectif"
                                                  onChangeText={(text) =>
                                                    (field.value[index] = text)
                                                  }
                                                  style={{
                                                    backgroundColor: '#FFFFFF',
                                                    width:
                                                      widthPercentageToDP(90),
                                                    paddingTop: 10,
                                                    paddingBottom: 10,
                                                    paddingLeft: 15,
                                                    paddingRight: 15,
                                                  }}
                                                  name={`degrees.${index}`}
                                                />
                                              </View>
                                              <View
                                                style={{
                                                  alignItems: 'flex-end',
                                                  marginTop: 15,
                                                  marginBottom: 5,
                                                  color: '#2CDEE4',
                                                }}>
                                                <TouchableOpacity
                                                  onPress={() =>
                                                    arrayhelper.remove(index)
                                                  }>
                                                  <Text
                                                    style={{
                                                      color: '#2CDEE4',
                                                    }}>
                                                    Supprimer
                                                  </Text>
                                                </TouchableOpacity>
                                              </View>
                                            </ScrollView>
                                          )
                                        ),
                                                  )}
                                      
                                      <View style={{borderWidth:errors.diplomas?2:0,borderColor:errors.diplomas?'red':'transparent'}} >
                                      <TouchableOpacity
                                        onPress={() => arrayhelper.push('')}>
                                        <View
                                          style={{
                                            flexDirection: 'row',
                                            alignItems: 'baseline',
                                            marginRight:
                                              widthPercentageToDP(49),
                                          }}>
                                          <FontAwesome
                                            name="plus-square"
                                            size={24}
                                            color="#2CDEE4"
                                          />
                                          <Text
                                            style={{
                                              fontFamily: 'RobotoBold',
                                              marginLeft: 10,
                                              padding: 5,
                                              color: '#FFFFFF',
                                            }}>
                                            Ajouter un diplôme
                                          </Text>
                                        </View>
                                      </TouchableOpacity>
                                    </View>
                                   { errors.diplomas?<Text style={{color:'red'}}>Ajouter un diplôme</Text>:null
                                   }
                                    </View>
                                          
                                  )}
                                />
                              </View>
                            </ScrollView>

                            <View style={{ alignItems: 'center' }}></View>
                          </View>
                        );
                      }}
                    </Field>
                    <Button
                      loading={false}
                      disabled={!isValid}
                      title="suivant"
                      customTextStyle={{
                        fontFamily: 'RobotoBold',
                        fontSize: 17,
                      }}
                      onPress={handleSubmit}
                    />
                  </View>
                  
                )}
                
              </Formik>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: heightPercentageToDP(10),
    alignItems: 'center',
  },
  container2: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  textStyle: {
    color: '#000000',
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
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

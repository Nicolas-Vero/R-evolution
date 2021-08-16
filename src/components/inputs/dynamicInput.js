import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Button,
  TextInput,
  Image,
} from 'react-native';
const { width } = Dimensions.get('window');
import { Formik, Form, Field, FieldArray } from 'formik';
import { BasicTextInput } from '.';
import { ScrollView } from 'react-native';
import { Icon, Row } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';

export const dynamicInput = React.forwardRef(
  (
    { name, placeholder, values, secureTextEntry, keyboardType, validate },
    ref,
  ) => {
    return (
        <ScrollView>
      <Field name={name} id={name} validate={validate}>
        {({
          field,
          meta,
          form: { touched, errors, isSubmitting, setFieldTouched },
        }) => {
          const fieldError = errors[field.name];
          const formatedFieldError =
            Object.prototype.toString.call(fieldError) === '[object Array]'
              ? fieldError.join(' & ')
              : fieldError;
          const shouldDisplayError = formatedFieldError && touched[name];
          return (
            <View>
              <View>
                <Image
                  source={require('../../../assets/images/Group_1.png')}
                  style={{ width: 350 }}
                />
              </View>
              <View style={styles.container}>
              <View style={{borderWidth:4,}}> 
              <Text>DIPLOME(S)</Text>
              </View>
                <FieldArray
                  name={name}
                  render={(arrayhelper) => (
                    <View style={styles.container2}>
                      {field.value.map(
                        (fields, index) => (
                          console.log(field.value),
                          (
                            <View>
                            <View style={{maxHeight:250}}
                              style={{ alignContent: 'center' }}
                              key={index}>
                              <TextInput
                                placeholder="Entre le nom de ton diplôme"
                                onChangeText={(text) =>
                                  (field.value[index] = text)
                                }
                                style={{
                                  backgroundColor:'#FFFFFF',
                                  width: 300,
                                  paddingTop: 10,
                                  paddingBottom: 10,
                                  paddingLeft: 15,
                                  paddingRight: 15,
                                }}
                                name={`degrees.${index}`}
                              />
                            </View>
                            <View style={{marginLeft:235,marginTop:5,marginBottom:5,color:'#2CDEE4'}}>
                              <TouchableOpacity 
                               onPress={() => arrayhelper.remove(index)}
                              >
                                <Text style={{color:'#2CDEE4'}}>Supprimer</Text>
                              </TouchableOpacity>
                                </View>
                                </View>
                          )
                          ),
                          )}
                         <TouchableOpacity 
                                style={{borderColor:'blue',borderWidth:3}}
                                 onPress={() => arrayhelper.push('')}
                              >
                          <View style={{flexDirection:'row' ,alignItems:'baseline',marginRight:135,}}>
                              <FontAwesome name="plus-square" size={24} color="#2CDEE4" />
                              <Text style={{marginLeft:10,padding:5,color:'#FFFFFF',fontWeight:'bold'}}>ajouter un diplôme</Text>
                              </View>
                              </TouchableOpacity>
                    </View>
                  )}
                  />
              </View>
              <View>
                {shouldDisplayError && (
                  <DefaultText>{formatedFieldError}</DefaultText>
                  )}
              </View>
            </View>
          );
        }}
      </Field>
                  </ScrollView>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    marginTop: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: '#000000',
  },
});

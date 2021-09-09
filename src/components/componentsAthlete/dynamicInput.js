import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  Image,
} from 'react-native';
const { width } = Dimensions.get('window');
import { Field, FieldArray } from 'formik';
import { ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { loadFonts } from '../../configs/design/font';

export const dynamicInput = React.forwardRef(
  (
    { name, placeholder, values, secureTextEntry, keyboardType, validate },
    ref,
  ) => {
    useEffect(() => {
      loadFonts()
    }, []);
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
              <View style={{alignItems:'center'}}>
                <Image
                  source={require('../../../assets/images/Group_1.png')}
                  style={{ width: widthPercentageToDP(80) }}
                />
                
              </View>
              <View style={{ alignItems:'center' ,marginTop:135}}> 
              <Text style={{ fontFamily: 'RobotoBold', fontSize: 20, color: '#FFFF' }}>DIPLÔME(S)</Text>
              </View>
              <View style={styles.container}>
              
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
                                placeholder="Ajoute ton objectif"
                                onChangeText={(text) =>
                                  (field.value[index] = text)
                                }
                                style={{
                                  backgroundColor:'#FFFFFF',
                                  width: widthPercentageToDP(90),
                                  paddingTop: 10,
                                  paddingBottom: 10,
                                  paddingLeft: 15,
                                  paddingRight: 15,
                                }}
                                name={`degrees.${index}`}
                              />
                            </View>
                            <View style={{alignItems:'flex-end', marginTop:15,marginBottom:5,color:'#2CDEE4'}}>
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
                             
                                 onPress={() => arrayhelper.push('')}
                              >
                          <View style={{flexDirection:'row' ,alignItems:'baseline',marginRight:widthPercentageToDP(49)}}>
                              <FontAwesome name="plus-square" size={24} color="#2CDEE4" />
                              <Text style={{fontFamily: 'RobotoBold',marginLeft:10,padding:5,color:'#FFFFFF'}}>Ajouter un diplôme</Text>
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
    marginTop: 100,
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

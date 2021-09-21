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
import { FontAwesome } from '@expo/vector-icons';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { loadFonts } from '../../configs/design/font';

export const mensuration = React.forwardRef(
  (
    { name, placeholder, values, secureTextEntry, keyboardType, validate },
    ref,
  ) => {
    useEffect(() => {
      loadFonts()
    }, []);
    return (

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
                  source={require('../../../assets/images/GroupA_1.png')}
                  style={{ width: widthPercentageToDP(80) }}
                />
                
              </View>
              <View style={{ alignItems:'center' ,marginTop:135}}> 
              <Text style={{ fontFamily: 'RobotoBold', fontSize: 20, color: '#FFFF' }}>AIDE NOUS A MIEUX TE CONNAÎTRE</Text>
              </View>
              <View style={styles.container}>
              
                <FieldArray
                  name={name}
                  render={(arrayhelper) => (
                    <View style={styles.container2}>
                      {
                            <View>
                            <View style={styles.container2}
                             >
                              <TextInput
                                style={styles.field}
                                placeholder="Taille"
                                onChangeText={(text) =>
                                ( arrayhelper.form.values.size = text )
                                  
                                }
                            
                              />
                            </View>
                            <View style={styles.container2}
                             
                             >
                              <TextInput
                                placeholder="Poids"
                                onChangeText={(text) =>
                                  (arrayhelper.form.values.weight = text)
                                }
                                style={styles.field}
                            
                              />
                            </View>
                            <View style={styles.container2}
                             >
                              <TextInput
                               style={styles.field}
                                placeholder="Âge"
                                onChangeText={(text) =>
                                  (arrayhelper.form.values.age = text)
                                }
                               
                            
                              />
                            </View>
                          
                                </View>
                         }
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
    marginVertical:5
  },
  textStyle: {
    color: '#000000',
  },
  field:{
    backgroundColor:'#FFFFFF',
    width: widthPercentageToDP(60),
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius:5
  }
});

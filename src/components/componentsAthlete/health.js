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
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { loadFonts } from '../../configs/design/font';
import SelectDropdown from 'react-native-select-dropdown';
import { AntDesign } from '@expo/vector-icons';
export const health = React.forwardRef(
  (
    { name, placeholder, values, secureTextEntry, keyboardType, validate },
    ref,
  ) => {
    useEffect(() => {
      loadFonts();
    }, []);
    const data = ['OUI', 'NON'];
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
              <View style={{ alignItems: 'center' }}>
                <Image
                  source={require('../../../assets/images/GroupA_4.png')}
                  style={{ width: wp(80) }}
                />
              </View>
              <View style={{ alignItems:'flex-start', marginTop: 135 }}>
                <Text
                  style={{
                    fontFamily: 'RobotoBold',
                    fontSize: 17,
                    color: '#FFFF',
                  }}>
                  DES PROBLÈMES DE SANTÉ A SIGNALER
                </Text>
              </View>
              <View>
                <FieldArray
                  name={name}
                  render={(arrayhelper) => (
                    <View style={styles.container2}>
                      {
                        <View>
                          <View style={styles.container2}>
                            <SelectDropdown
                              buttonStyle={{ width: wp(50), borderRadius: 5 }}
                              data={data}
                              defaultButtonText={'choisir'}
                              onSelect={(selectedItem, index) => {
                                arrayhelper.form.values.healthIssues = selectedItem
                              }}
                              renderDropdownIcon={() => {
                                return (
                                  <AntDesign
                                    name="down"
                                    size={24}
                                    color="black"
                                  />
                                );
                              }}
                              dropdownIconPosition={'right'}
                              buttonTextAfterSelection={(
                                selectedItem,
                                index,
                              ) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return selectedItem;
                              }}
                              rowTextStyle={{
                                color: 'white',
                                fontSize: 15,
                                marginRight: 90,
                              }}
                              dropdownStyle={{
                                backgroundColor: '#282C3A',
                                borderRadius: 5,
                              }}
                              rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item;
                              }}
                            />
                          </View>
                          <View style={styles.container2}>
                            <View
                              style={{ marginTop: 20 }}>
                              <Text
                                style={{
                                  fontFamily: 'RobotoBold',
                                  fontSize: 17,
                                  color: '#FFFF',
                                }}>
                              INFORMATIONS COMPLÉMENTAIRES
                              </Text>
                            </View>
                            <View style={styles.container2}>
                            <TextInput
                              style={styles.field}
                              placeholder="Description"
                              onChangeText={(text) => (arrayhelper.form.values.information = text)}
                            />
                            </View>
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
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginVertical: 30,
  },
  textStyle: {
    color: '#000000',
  },
  field: {
    backgroundColor: '#FFFFFF',
    width: wp(92),
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    height:130,
    paddingRight: 15,
    borderRadius: 5,
  },
});

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
const { width } = Dimensions.get('window');
import { Field, FieldArray } from 'formik';
import { AntDesign } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown';
import { get_gym } from '../../api/ReferenceData';
import { ActivityIndicator } from 'react-native';
import {
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { CheckBox } from 'react-native-elements';
import { get_coach } from '../../api/Coach';
export const destinataire = React.forwardRef(
  (
    { name, placeholder, values, secureTextEntry, keyboardType, validate },
    ref,
  ) => {
    const [Coach, setData] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [checked, setChecked] = useState(false);
    useEffect(() => {
      get_coach().then((res) => {
        console.log('les coachs ', res.data);
        setData(res.data);
        setIsLoaded(true);
      });
    }, []);

    if (!isLoaded) {
      return (
        <View style={[styles.Activitycontainer, styles.horizontal]}>
          <ActivityIndicator size="large" color="#696969" />
        </View>
      );
    } else {
      const data = [];
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
                    source={require('../../../assets/images/GroupA_7.png')}
                    style={{ width: wp(80) }}
                  />
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    marginTop: 75,
                    marginBottom: 100,
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 20,
                      color: '#FFFF',
                    }}>
                    À QUI VEUX-TU ADRESSER TA DEMANDE ?
                  </Text>
                </View>
                <View style={{ marginTop: 30 }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 17,
                      color: '#FFFF',
                    }}>
                    Un coach en particulier ?
                  </Text>
                </View>
                <View style={styles.container}>
                  <FieldArray
                    name={name}
                    render={(arrayhelper) => (
                      <View>
                        <SelectDropdown
                          buttonStyle={{ width: wp(90), borderRadius: 5 }}
                          data={Coach}
                          defaultButtonText={'Recherche ton coach'}
                          onSelect={(selectedItem, index) => {
                            arrayhelper.form.values.coach_preference = {
                              type: 'specific_coach',
                              coach_id: selectedItem.id,
                            };
                            setChecked(false)
                          }}
                          renderDropdownIcon={() => {
                            return (
                              <AntDesign name="down" size={24} color="black" />
                            );
                          }}
                          dropdownIconPosition={'right'}
                          buttonTextAfterSelection={(selectedItem, index) => {
                            let show = '';
                            checked?null: show = `${selectedItem.first_name}  ${selectedItem.last_name}`;
                            return show;
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
                            return item.first_name;
                          }}
                        />
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 15,
                            marginBottom: 24,
                          }}>
                          <CheckBox
                            size={25}
                            containerStyle={{
                              paddingLeft: 0,
                              marginLeft: 0,
                              borderWidth: 0,
                            }}
                            uncheckedColor="#2CDEE4"
                            checked={checked}
                            value={arrayhelper.form.values.coach_preference}
                            onPress={() => {
                              arrayhelper.form.values.coach_preference = {
                                type: 'any_coach',
                              };
                              setChecked(true)
                            }}
                          />
                          <Text
                            style={{
                              flex: 1,
                              flexWrap: 'wrap',
                              color: '#FFFFFF',
                              fontFamily: 'Roboto',
                              fontSize: 13,
                            }}>
                            Peu importe
                          </Text>
                        </View>
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
    }
  },
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  dropdownlist: {
    padding: 20,
  },

  title: {
    fontSize: 32,
  },
});

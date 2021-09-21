import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
const { width } = Dimensions.get('window');
import { Field, FieldArray } from 'formik';
import { AntDesign } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown';
import { get_gym } from '../../api/ReferenceData';
import { ActivityIndicator } from 'react-native';
import { widthPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen';
export const selectList = React.forwardRef(
  (
    { name, placeholder, values, secureTextEntry, keyboardType, validate },
    ref,
  ) => {
    const [Gymdata, setData] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
      get_gym().then((res) => {
        setData(res.data);
        setIsLoaded(true);
      });
    }, []);

    

    if (!isLoaded) {
      return (
  
        <View style={[styles.Activitycontainer, styles.horizontal]}>
          <ActivityIndicator size="large" color="#696969" />
        </View>
  
      )
    }
    else {
      const data = [];
    Gymdata.forEach((element) => {
     data.push(`${element.name} ${element.address_1} ${element.address_2} ${element.city}`)
    });
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
              source={require('../../../assets/images/GroupA_5.png')}
              style={{ width: widthPercentageToDP(80) }}
            />
            </View>
              <View
                style={{
                  alignItems: 'center',
                  marginTop: 75,
                  marginBottom:100
                }}>
                <Text
                  style={{ fontWeight: 'bold', fontSize: 20, color: '#FFFF' }}>
                 OÙ SOUHAITES-TU T'ENTRAÎNER ?
                </Text>
               
              </View>
              <View style={{marginTop:30}}>
              </View>
              <View style={styles.container}>
                <FieldArray 
                 name={name}
                 render={(arrayhelper) => (
                <SelectDropdown
                  buttonStyle={{ width: wp(90), borderRadius:5  }}
                  data={Gymdata}
                  defaultButtonText={"Recherche le nom de ta salle"}
                  onSelect={(selectedItem) => {
                   arrayhelper.form.values.gymPlace = selectedItem
                  }}
                  renderDropdownIcon={() => {
                    return <AntDesign name="down" size={24} color="black" />;
                  }}
                  dropdownIconPosition={'right'}
                  buttonTextAfterSelection={(selectedItem) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    
                    return selectedItem.name;
                  }}
                  
                  rowTextStyle={{color:'white',fontSize:15, marginRight:90}}
                  dropdownStyle={{backgroundColor:'#282C3A',borderRadius:5 }}
                  rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item.name;
                  }}
                />
                 )}/>
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
    );}
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

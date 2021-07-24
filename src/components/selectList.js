import React , { useState } from 'react'
import {View, Text, TouchableOpacity, StyleSheet, StatusBar, Dimensions, Button,TextInput, Image} from 'react-native';
const {width} = Dimensions.get('window');
import { Formik, Form, Field, FieldArray } from "formik";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { color } from 'react-native-elements/dist/helpers';
import SelectDropdown from 'react-native-select-dropdown'
export const selectList = React.forwardRef(
(
  {
    name,
    placeholder,
    values,
    secureTextEntry,
    keyboardType,
    validate,
  },
  ref,
)  =>
{
    
    return (
        <Field name={name} id={name} validate={validate}>
      {({
          field,
          meta,
          form: {touched, errors, isSubmitting, setFieldTouched},
        }) => {
            const fieldError = errors[field.name];
            const formatedFieldError =
            Object.prototype.toString.call(fieldError) === '[object Array]'
            ? fieldError.join(' & ')
            : fieldError;
            const shouldDisplayError = formatedFieldError && touched[name];

            const Item = ({ title, selected }) => (
                <View  style={styles.item}>
                  <Text style={styles.title}>{title}</Text>
                </View>
              );
        return (       
       
        <View>
           <View>
                <Image
                  source={require('../../assets/images/Group_1.png')}
                  style={{ width: 350 }}
                />
              </View>
      <View style={{ alignItems:'center', borderColor:'green',borderWidth:3,marginTop:75}}>
        <Text style={{fontWeight:'bold',fontSize:20, color:'#FFFF'}}>LIEU D'EXPERIENCE</Text>
      </View>
        <View style={styles.container}>
        <SelectDropdown
	data={["Egypt", "Canada", "Australia", "Ireland"]}
	onSelect={(selectedItem, index) => {
		console.log(selectedItem, index)
	}}
	buttonTextAfterSelection={(selectedItem, index) => {
		// text represented after item is selected
		// if data array is an array of objects then return selectedItem.property to render after item is selected
		return selectedItem
	}}
	rowTextForSelection={(item, index) => {
		// text represented for each item in dropdown
		// if data array is an array of objects then return item.property to represent item in dropdown
		return item
	}}
/>
                   </View>
    <View>
    </View>
    <View>
      {shouldDisplayError && (
        <DefaultText>
          {formatedFieldError}
        </DefaultText>
      )}
    </View>

  </View>
);
}}
</Field>
);}
)

const styles = StyleSheet.create({
    container: {
       justifyContent:'center',
       alignItems:'center',
        height: 200,
      },
    dropdownlist: {
      
      padding: 20,
    },

    title: {
      fontSize: 32,
    },
  });
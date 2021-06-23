import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions, Button,TextInput} from 'react-native';
const {width} = Dimensions.get('window');
import { Formik, Form, Field, FieldArray } from "formik";
import { BasicTextInput } from '.';

export const dynamicInput = React.forwardRef(
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
)  =>{
    
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
        return (
    <View>
    <View>
    <FieldArray
            name={name}
            render={arrayhelper => (
              <View>
                {
                 
                  field.value.map((fields, index) => (
                    console.log(field.value),
                    <View key={index}>
                      <TextInput
                       onChangeText={(text)=>field.value[index]=text} 
                       style={{backgroundColor: '#FFFFFF', paddingTop: 10, paddingBottom: 10, paddingLeft: 15, paddingRight: 15}} name={`degrees.${index}`} />
                      <Button
                        title="-"
                        onPress={() => arrayhelper.remove(index)} // remove a friend from the list
                      />
                    
                
                    </View>
                    
                  ))
               }
                 <Button title={`add ${name}`} onPress={() => arrayhelper.push("")}/>
              </View>
            )}
          />
    </View>
    <View>
      {shouldDisplayError && (
        <DefaultText>
          {formatedFieldError}
        </DefaultText>
      )}
    </View>
   <Text>Value: {field.value}</Text>
  </View>
);
}}
</Field>
);}
)


const defaultStyle = StyleSheet.create({
    container: {
        width: width, 
        height: 48, 
        backgroundColor: '#2CDEE4', 
        borderRadius: 3, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    textStyle: {
        color: "#000000"
    }
})
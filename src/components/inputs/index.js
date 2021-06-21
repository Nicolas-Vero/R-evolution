import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Field} from 'formik';

const {height} = Dimensions.get('window');




export const BasicTextInput = React.forwardRef(
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
            <TextInput
              ref={ref}
              value={values[name]}
              name={name}
              keyboardType={keyboardType}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              onChangeText={text => field.onChange(name)(text)}
             
            />
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
export const multipleInputs = React.forwardRef(
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
            <TextInput
              ref={ref}
              value={values[name]}
              name={name}
              keyboardType={keyboardType}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              onChangeText={text => field.onChange(name)(text)}
             
            />
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

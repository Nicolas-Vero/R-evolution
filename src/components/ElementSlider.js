import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
const {width} = Dimensions.get('window');
import {Field} from 'formik';
import { Slider } from 'react-native-elements';
import { Icon } from 'react-native-elements';
export const ElementSlider = React.forwardRef(
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
          console.log('top',values),
    <View>
    <View>
    <Slider
           ref={ref}
           name={name}
          onSlidingComplete={num => {field.onChange(name)(''+num)}}
          maximumValue={10}
          minimumValue={0}
          step={1}
          trackStyle={{ height: 10, backgroundColor: 'transparent' }}
          thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
          thumbProps={{
            children: (
              <Icon
                name="heartbeat"
                type="font-awesome"
                size={20}
                reverse
                containerStyle={{ bottom: 20, right: 20 }}
                color="#f50"
              />
            ),
          }}
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
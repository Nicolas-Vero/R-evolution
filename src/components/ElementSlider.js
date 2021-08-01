import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions,Image } from 'react-native';
const {width} = Dimensions.get('window');
import {Field} from 'formik';
import Slider from "react-native-slider";
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
     
    <View>
       <View>
                <Image
                  source={require('../../assets/images/Group_2.png')}
                  style={{ width: 350 }}
                />
              </View>
      <View style={{ alignItems:'center', borderColor:'green',borderWidth:3,marginTop:75}}>
        <Text style={{fontWeight:'bold',fontSize:20, color:'#FFFF'}}>ANNEE(S) D'EXPERIENCE</Text>
      </View>
    <View style={{borderColor:'green',borderWidth:3,marginTop:150}}>
    <Slider
          trackStyle={{ height: 10, backgroundColor: 'blue' }}
          thumbStyle={{ height: 20, width: 20, backgroundColor: 'white' }}
          track
          containerStyle={{ bottom: 20, right: 20 }}
           ref={ref}
           name={name}
          onSlidingComplete={num => {field.onChange(name)(''+num)}}
          maximumValue={10}
          minimumValue={0}
          step={1}
      
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


const styles = StyleSheet.create({
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
    },
    slider:{

    }
})
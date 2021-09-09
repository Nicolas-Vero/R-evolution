import React, { useEffect } from 'react'
import {View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions,Image } from 'react-native';
const {width} = Dimensions.get('window');
import {Field} from 'formik';
import Slider from "react-native-slider";
import { Icon } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { loadFonts } from '../../configs/design/font';
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
  useEffect(() => {
    loadFonts()
  }, []);
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
       <View style={{alignItems:'center'}}>
                <Image
                  source={require('../../../assets/images/GroupA_2.png')}
                  style={{ width: widthPercentageToDP(80) }}
                />
                
              </View>
      <View style={{alignContent:'center', alignItems:'center', marginTop:75}}>
        <Text style={{marginTop:60, fontFamily:'RobotoBold',fontSize:20, color:'#FFFF'}}>EXPÉRIENCES SPORTIVE </Text>
      </View>
    <View style={{ alignItems:'center',marginTop:110}}>
    <Slider
    style={{width:wp(90)}}
    
          trackStyle={{ height: 10, backgroundColor: '#282C3A' }}
          thumbStyle={{ height: 20, width: 20, backgroundColor: '#2CDEE4' }}
          minimumTrackTintColor='#2CDEE4'
          track
           ref={ref}
           name={name}
          onSlidingComplete={num => {field.onChange(name)(''+num)}}
          maximumValue={10}
          minimumValue={0}
          step={1}
      
        />
        <View style={{ marginTop:wp(10), alignItems:'center', justifyContent:'center', height:hp(5),width:wp(40), backgroundColor:'#282C3A',borderRadius:5}}>
        {field.value<1?<Text style={{fontFamily:'RobotoBold',fontSize:17, color:'#FFFF'}}>AUCUNE</Text>:(field.value>9?<Text style={{fontWeight:'bold',fontSize:20, color:'#FFFF'}}>PLUS DE {field.value} ANS</Text>:<Text style={{fontWeight:'bold',fontSize:20, color:'#FFFF'}}>{field.value} ANS</Text>)}
    </View>
    </View>
    
   
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
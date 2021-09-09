import React, { useEffect, useState } from 'react'
import {View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions,Image } from 'react-native';
const {width} = Dimensions.get('window');
import {Field} from 'formik';
import Slider from "react-native-slider";
import { Icon } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { loadFonts } from '../../configs/design/font';
import { FlatList } from 'react-native-gesture-handler';
import { forEach } from 'lodash';
export const ElementSlider2 = React.forwardRef(
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
  
  const Day =[{day:'L',selected:0},{day:'M',selected:0},{day:'ME',selected:0},{day:'J',selected:0},{day:'V',selected:0},{day:'S',selected:0},{day:'D',selected:0}];
  return (
    <Field name={name} id={name} validate={validate}>
      {({
        field,
        meta,
        form: {touched, errors, isSubmitting, setFieldTouched},
      }) => {
        const [selectedId, setSelectedId] = useState(null);
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
                  source={require('../../../assets/images/GroupA_6.png')}
                  style={{ width: widthPercentageToDP(80) }}
                />
                
              </View>
      <View style={{alignContent:'center', alignItems:'center', marginTop:75}}>
        <Text style={{marginTop:60, fontFamily:'RobotoBold',fontSize:20, color:'#FFFF'}}>À QUELLE MOMMENT DE LA JOURNÉE?</Text>
        <Text>ENTRE</Text>
        <Text></Text>
        <Text>ET</Text>
        <Text></Text>
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
        <Text style={{fontFamily:'RobotoBold',fontSize:17, color:'#FFFF'}}>QUELLE JOUR ?</Text>
  

    </View>
    </View>
    <FlatList
      horizontal={true}
                  data={Day}
                  extraData={Day}
                  renderItem={({ item }) => {
                    const borderColor = item.selected == 1 ? 'transparent' : "white";
                    const borderWidth = item.selected == 1 ? 1 : 1;
                    const color = item.selected == 1 ? "black" : "white";
                    const backgroundColor = item.selected == 1 ?"#2CDEE4" : "#1E2026";
                     const textColor = item.selected == 1 ? "black" : "white";
                    
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          item.selected != 1 ? item.selected =1 :item.selected = 0
                          console.log(item);
                          //  arrayhelper.form.values.objectifs.includes(item.value)?arrayhelper.remove(item.value):arrayhelper.push(item.value)
                        
                        }}>
                    <View style={[styles.day, {backgroundColor:backgroundColor}]}>
                        <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',alignContent:'center'}}>
                        <Text style={{ color:textColor,justifyContent:'center',alignItems:'center',alignContent:'center' }}>
                          {item.availability_day}
                        </Text>
                        <Text style={{ color:textColor, marginTop:10,justifyContent:'center',alignItems:'center',alignContent:'center' }}>
                          {item.day}
                        </Text>
                        </View>
                    </View>
                      </TouchableOpacity>
                    )}}
                  keyExtractor={(item) => item.id}
                  extraData={selectedId}
                />
   
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
    day: {
      height: 70,
      width: 50,
      marginHorizontal:5,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    textStyle: {
        color: "#000000"
    },
    slider:{

    }
})
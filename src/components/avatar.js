import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions,Image, SafeAreaView, Button } from 'react-native';
const {width} = Dimensions.get('window');
import {Field} from 'formik';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import ResponsiveText from '../common/ResponsiveText';
import { _pickImage, askPermissionsAsync, onContinuePress } from './AddAvatar';
export const avatar = React.forwardRef(
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
                  source={require('../../assets/images/Group_4.png')}
                  style={{ width: 350 }}
                />
              </View>
      <View style={{ alignItems:'center', borderColor:'green',borderWidth:3,marginTop:75}}>
        <Text style={{fontWeight:'bold',fontSize:20, color:'#FFFF'}}>Avatar</Text>
      </View>
    <View style={{borderColor:'green',borderWidth:3,marginTop:150}}>
    <SafeAreaView style={{flex: 1}}>
        <View style={styles.content}>
          <View>
          
            <ResponsiveText style={styles.message}>toto</ResponsiveText>
          </View>

          <View style={styles.pickerContainer}>
            <TouchableOpacity
              onPress={()=>{_pickImage}}
              style={styles.imageContainer}>
              {/* {
                image &&
                <Image source={{uri: image.uri}}
                       style={styles.selectedImage}/>
              } */}
              <Image
                style={styles.addImageIcon}
                source={require('../../assets/images/pen.png')}
              />
            </TouchableOpacity>
            <Button
              title="Continuer"
              gradientStyle={styles.btnGradientStyle}
              onPress={(element)=>{console.log(element)}}
            //   loading={loading}
            />
          </View>
        </View>
      </SafeAreaView>
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
    content: {
        flex: 1,
        paddingVertical: 30,
        paddingHorizontal: 20
      },
      pickerContainer: {
        flex: 1,
        justifyContent: 'center',
      },
      userAvatarContainer: {
        width: wp('40%'),
        height: wp('40%'),
        borderRadius: wp('20%'),
       // borderColor: Color.SecondaryText,
        borderWidth: 1,
        backgroundColor: '#F0F2F7',
        position: 'relative',
        alignSelf: 'center'
      },
      selectedImage: {
        width: wp('40%'),
        height: wp('40%'),
        borderRadius: wp('20%'),
        resizeMode: 'cover'
      },
      addImageIcon: {
        width: wp('11%'),
        height: wp('11%'),
        position: 'absolute',
        bottom: 0,
        right: 0
      },
      btnRightArrow: {
        width: wp('6%'),
        resizeMode: 'contain'
      },
      btnGradientStyle: {
        marginHorizontal: wp('20%'),
        marginTop: 20
      },
      message: {
        fontSize: 5,
        alignSelf: 'center',
        marginTop: 20
      }
})
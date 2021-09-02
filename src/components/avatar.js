import React, { useEffect, useState } from 'react'
import {View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions,Image, SafeAreaView, Button } from 'react-native';
const {width} = Dimensions.get('window');
import {Field} from 'formik';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import ResponsiveText from '../common/ResponsiveText';
import * as ImagePicker from 'expo-image-picker';
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

  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
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
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{backgroundColor:'white', height:150,width:190}}>
            <TouchableOpacity style={{height:150,width:190}} onPress={pickImage} >
            <Image style={{height:150,width:190}} source={'../../assets/images/AddPhoto'}/>
            </TouchableOpacity>
            </View>
          <Button title="Pick an image from camera roll" onPress={pickImage} />
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
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
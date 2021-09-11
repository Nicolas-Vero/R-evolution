import React, { useEffect, useState } from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Dimensions,Image } from 'react-native';
const {width} = Dimensions.get('window');
import {Field, FieldArray} from 'formik';
import {widthPercentageToDP, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import * as ImagePicker from 'expo-image-picker';
import { Avatar } from 'react-native-elements';
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

  const pickImage = async (arrayhelper) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      arrayhelper.form.values.avatar = result.uri;
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
         
          <View >
                 <View style={{alignItems:'center'  }}>
            <Image
              source={require('../../../assets/images/GroupA_8.png')}
              style={{ width: widthPercentageToDP(80) }}
            />
             <View
                style={{
                  alignItems: 'center',
                  marginTop: 75,
                  marginBottom:100
                }}>
                <Text
                  style={{ fontWeight: 'bold', fontSize: 20, color: '#FFFF' }}>
                  PHOTO DE PROFIL
                </Text>
               
              </View>
              <View style={{marginTop:30}}>
            { image? (<Text  style={{ fontWeight: 'bold', fontSize: 17, color: '#FFFF' }}>Superbe photo!</Text>):(<Text  style={{ fontWeight: 'bold', fontSize: 20, color: '#FFFF',textAlign:'center' }}>C'est toujours plus professionnel avec une photo de profil</Text>)}
              </View>
            </View>
            <View style={{alignItems:'center' , justifyContent:'center',marginTop:50}} >
              <FieldArray
               name={name}
               render={(arrayhelper,) => (
                 
            <TouchableOpacity onPress={ (item)=>{pickImage(arrayhelper,item) }} >
            {image? (
              
              <View>
            <Avatar  size='xlarge'
                rounded source={{ uri: image }} />
               {/* <Image style={{height:20,width:50,resizeMode:'contain', }} source={require('../../assets/images/AddPhoto.png')}/> */}
            </View>    
                ):(<Image style={{height:150,width:190,resizeMode:'contain', }} source={require('../../../assets/images/AddPhoto.png')}/>)}
            </TouchableOpacity>
         )}   />
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
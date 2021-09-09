import React, { useState,useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  Button,
  TextInput,
  ActivityIndicator,
  FlatList,
  Image,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
const { width } = Dimensions.get('window');
import { Formik, Form, Field, FieldArray } from 'formik';
import { get_specialities } from '../../api/ReferenceData';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { loadFonts } from '../../configs/design/font';

export const dynamicListAthlete = React.forwardRef(
  (
    { name, placeholder, values, secureTextEntry, keyboardType, validate },
    ref,
  ) => {
    const [specData, setData] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
      loadFonts();
      get_specialities().then((res) => {
        setData(res.data);
        setIsLoaded(true);
      });
    }, []);

    if (!isLoaded) {
      return (
  
        <View style={[styles.Activitycontainer, styles.horizontal]}>
          <ActivityIndicator size="large" color="#696969" />
        </View>
  
      )
    }
    else {
    return (
      
      <Field name={name} id={name} validate={validate}>
        {({
          field,
          meta,
          form: { touched, errors, isSubmitting, setFieldTouched },
        }) => {
          const numColumns = 3;
          const fieldError = errors[field.name];
          const formatedFieldError =
            Object.prototype.toString.call(fieldError) === '[object Array]'
              ? fieldError.join(' & ')
              : fieldError;
          const shouldDisplayError = formatedFieldError && touched[name];
          const [selectedId, setSelectedId] = useState(null);
          const [term, setTerm] = useState();
          return (
            <View style={{alignItems:'center'}}>
            <Image
              source={require('../../../assets/images/GroupA_3.png')}
              style={{ width: widthPercentageToDP(80) }}
            />
            
            
                <View style={styles.container2}>
                  <Text style={styles.title}>QUEL EST TON OBJECTIF</Text>
                </View>
             <View style={{width:widthPercentageToDP(90)}}>
                <Text style={styles.text}>
                Sélectionne ton ou tes objectifs(s)
                </Text>
                </View>
              <View>
                <FieldArray
                  name={name}
                  render={(arrayhelper) => (
                    
                    <View style={{alignItems:'center'}}>
                      <View style={styles.container3}>
                <FlatList
                  data={specData}
                  extraData={specData}
                  renderItem={({ item }) => {

                    item.selected?console.log(item.selected):console.log('noclick');;
                    const backgroundColor = item.selected == 1 ? "#2CDEE4" : 'transparent' ;
                    const borderColor = item.selected == 1 ? 'transparent' : "white";
                    const borderWidth = item.selected == 1 ? 1 : 1;
                    const color = item.selected == 1 ? "black" : "white";
                    
                    return(

                   <TouchableOpacity
                      onPress={() =>{item.selected != 1 ? item.selected =1 :item.selected = 0
                        arrayhelper.form.values.objectifs.includes(item.value)?arrayhelper.remove(item.value):arrayhelper.push(item.value)
                        }}>
                      <View style={{backgroundColor:backgroundColor, borderRadius: 25,  padding: 10, justifyContent:'center', margin:5, borderColor:borderColor, borderWidth:borderWidth}}>
                          <Text style={{fontFamily:'RobotoBold',fontSize: 15,color:color}}>{item.value}</Text>
                      </View>
                    </TouchableOpacity>
                    )}}
                  keyExtractor={(item) => item.id}
                  extraData={selectedId}
                  numColumns={numColumns}
                />
              </View>
              <View style={{width:widthPercentageToDP(90)}}>
                      <TextInput
                        name={name}
                        onChangeText={setTerm}
                        style={{
                        backgroundColor: '#FFFFFF',
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingLeft: 15,
                        paddingRight: 15,
                        width:widthPercentageToDP(90)
                        }}
                      />
                          <View style={{alignItems:'flex-end', marginTop:15,marginBottom:5, marginRight:5, color:'#2CDEE4'}}>
                              <TouchableOpacity 
                               onPress={() => {
                                specData.pop()
                                setTerm()
                              }} 
                              >
                                <Text style={{color:'#2CDEE4'}}>Supprimer</Text>
                              </TouchableOpacity>
                                </View>

                        <TouchableOpacity 
                             
                             onPress={() => {
                              specData.push({ value: term }),
                                setTerm()
                            }}
                          >
                      <View style={{flexDirection:'row' ,alignItems:'baseline',marginLeft:5,marginRight:widthPercentageToDP(48)}}>
                          <FontAwesome name="plus-square" size={24} color="#2CDEE4" />
                          <Text style={{fontFamily: 'RobotoBold',marginLeft:10,padding:5,color:'#FFFFFF'}}>Ajouter un objectif</Text>
                          </View>
                          </TouchableOpacity>
                          </View>
              
                    </View>
                  )}
                />
              </View>
              <View>
                {shouldDisplayError && (
                  <DefaultText>{formatedFieldError}</DefaultText>
                )}
              </View>
            </View>
          );
        }}
      </Field>
    );}
  },
);

const styles = StyleSheet.create({
  container1: {
    height: 300,
    alignItems:'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  container2: {
    height: 150,
    justifyContent: 'center',
    alignItems:'center',
    marginTop:65,
    
  },
  container3: {
    height: 150,
    width:widthPercentageToDP(95),
    padding: 5,
    justifyContent: 'center',
  },
  item: {
    backgroundColor: '#393637',
    borderRadius: 25,
    marginVertical: 8,
    padding: 10,
    justifyContent:'center',
  },
  itemcontent: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  title: {
    fontFamily:'RobotoBold',
    fontSize: 20,
    color: '#FFFFFF',
    lineHeight: 24,
  },
  text: {
    fontFamily:'RobotoBold',
    fontSize: 15,
    color: '#FFFFFF',
    marginBottom:30,
 
  },
});

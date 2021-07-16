import React , { useState } from 'react'
import {View, Text, TouchableOpacity, StyleSheet, StatusBar, Dimensions, Button,TextInput, FlatList} from 'react-native';
const {width} = Dimensions.get('window');
import { Formik, Form, Field, FieldArray } from "formik";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { color } from 'react-native-elements/dist/helpers';

export const dynamicList = React.forwardRef(
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
)  =>
{
    
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
            const [selectedId, setSelectedId] = useState(null);
            const [term, setTerm] = useState('');
            const Item = ({item, title,selected }) => (
                <View style={styles.item}>
                <Text style={styles.title}>{title}</Text>
                </View>
              );
        return (       
        <View>
        <View style={styles.container}>
          <FlatList
                   data = {field.value}
                   renderItem={({ item }) => (<TouchableOpacity onPress={() => item.selected==1? item.selected=0:item.selected=1 }><Item item={item} selected={item.selected} title={item.name} /></TouchableOpacity>)}
                   keyExtractor={(item) => item.name}
                   extraData={selectedId}
                   />
                   </View>
    <View>
    <FieldArray
            name={name}
            render={(arrayhelper) => (

              <View>
                 <TextInput
                       name = {name}
                       onChangeText={setTerm} 
                       style={{backgroundColor: '#FFFFFF', paddingTop: 10, paddingBottom: 10, paddingLeft: 15, paddingRight: 15}}  />
                     
                    
                <Button
                        title="-"
                        onPress={() =>arrayhelper.remove(-1)} // remove a friend from the list
                      />
                 <Button title={`add ${name}`} onPress={() => {
                     arrayhelper.push({name:term,selected:0}),
                    console.log(arrayhelper)
                     } }/>
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

  </View>
);
}}
</Field>
);}
)

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        marginBottom: 3,
        height: 200,
        padding: 5,
        marginLeft: 5,
        marginRight: 5
      },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    itemS: {
      backgroundColor: '#6e3b6e',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    itemSelected: {
      backgroundColor: '#ffffff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },

    title: {
      fontSize: 32,
    },
  });
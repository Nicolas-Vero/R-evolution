import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  Button,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
const { width } = Dimensions.get('window');
import { Formik, Form, Field, FieldArray } from 'formik';

export const dynamicList = React.forwardRef(
  (
    { name, placeholder, values, secureTextEntry, keyboardType, validate },
    ref,
  ) => {
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
          const [term, setTerm] = useState('');
          const Item = ({ item, title, selected }) => (
            <View style={styles.item}>
              <Text style={styles.itemcontent}>{title}</Text>
            </View>
          );
          return (
            <View>
              <Image
                source={require('../../assets/images/Group_3.png')}
                style={{ width: 350 }}
              />
              <View style={styles.container1}>
                <View style={styles.container2}>
                  <Text style={styles.title}>SPECIALITE</Text>
                </View>
                <Text style={styles.text}>
                  Selectionne une ou plusieurs spécialité
                </Text>
              </View>
              <View style={styles.container2}>
                <FlatList
                  data={field.value}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() =>
                        item.selected == 1
                          ? (item.selected = 0)
                          : (item.selected = 1)
                      }>
                      <Item
                        style={styles.item}
                        item={item}
                        selected={item.selected}
                        title={item.name}
                      />
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.name}
                  extraData={selectedId}
                  numColumns={numColumns}
                />
              </View>
              <View>
                <FieldArray
                  name={name}
                  render={(arrayhelper) => (
                    <View>
                      <TextInput
                        name={name}
                        onChangeText={setTerm}
                        style={{
                          backgroundColor: '#FFFFFF',
                          paddingTop: 10,
                          paddingBottom: 10,
                          paddingLeft: 15,
                          paddingRight: 15,
                        }}
                      />

                      <Button
                        title="-"
                        onPress={() => arrayhelper.remove(-1)} // remove a friend from the list
                      />
                      <Button
                        title={`add ${name}`}
                        onPress={() => {
                          arrayhelper.push({ name: term, selected: 0 }),
                            console.log(arrayhelper);
                        }}
                      />
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
    );
  },
);

const styles = StyleSheet.create({
  container1: {
    height: 300,
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
    alignContent: 'center',
    justifyContent: 'center',
  },
  container2: {
    height: 150,
    padding: 5,
    marginLeft: 25,
    marginRight: 5,
    justifyContent: 'center',
  },
  item: {
    backgroundColor: '#393637',
    borderRadius: 25,
    marginVertical: 8,
    padding: 10,
    marginHorizontal: 5,
  },
  itemcontent: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#FFFFFF',
    lineHeight: 24,
    alignContent: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#FFFFFF',
    lineHeight: 24,
  },
});

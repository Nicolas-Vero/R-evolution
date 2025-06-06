import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import { FieldArray, Formik } from 'formik';
import { AntDesign, FontAwesome, Entypo } from '@expo/vector-icons';
import { Avatar, CheckBox } from 'react-native-elements';
import { Button, DeleteButton } from '../../components/Button';
import HeaderLight from '../../components/HeaderLight';
import SelectDropdown from 'react-native-select-dropdown';
import styles from './ProfileCoachScreenStyle';

const ProfileCoachScreenView = ({ state, controller }) => {
  const [diplomasTerm, setDiplomasTerm] = useState('');
  const [specialitiesTerm, setSpecialitiesTerm] = useState('');
  const [refresh, setRefresh] = useState(false);

  if (!state.loaded) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView scrollIndicatorInsets={{ right: 1 }}>
        <Formik
          initialValues={{
            gender: state.User.gender,
            first_name: state.User.first_name,
            last_name: state.User.last_name,
            email: state.User.email,
            phone: state.User.phone,
            specialties: state.specData,
            diplomas: state.arrayofdiplomas,
          }}
          onSubmit={(values) => controller.onSave(values)}
        >
          {({ handleChange, handleBlur, setFieldValue, values }) => (
            <View>
              <View style={{ paddingTop: 30 }}>
                <View style={styles.header}>
                  <View style={styles.headerLeft}>
                    <HeaderLight />
                  </View>
                  <View style={styles.headerMidle}>
                    <TouchableOpacity onPress={() => controller.pickImage()}>
                      {state.image.uri ? (
                        <Avatar size={105} rounded source={{ uri: state.image.uri }} />
                      ) : state.Coach.profile_picture_url ? (
                        <Avatar size={105} rounded source={{ uri: state.Coach.profile_picture_url }} />
                      ) : (
                        <Image style={styles.previewImage} source={require('../../../assets/images/no_pp.jpg')} />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={styles.content}>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                  <CheckBox
                    containerStyle={styles.checkBox}
                    checkedColor="#2CDEE4"
                    title="M"
                    textStyle={{ color: '#fff' }}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="dot-circle-o"
                    checked={values.gender === 'male'}
                    onPress={() => setFieldValue('gender', 'male')}
                  />
                  <CheckBox
                    containerStyle={styles.checkBox}
                    checkedColor="#2CDEE4"
                    title="Mme"
                    textStyle={{ color: '#fff' }}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="dot-circle-o"
                    checked={values.gender === 'female'}
                    onPress={() => setFieldValue('gender', 'female')}
                  />
                </View>

                {/* Champs texte */}
                {['Prénom', 'Nom', 'Adresse e-mail', 'Téléphone'].map((label, idx) => {
                  const key = ['first_name', 'last_name', 'email', 'phone'][idx];
                  return (
                    <View key={key}>
                      <Text style={styles.text}>{label}</Text>
                      <View style={styles.inputContainer}>
                        <TextInput
                          placeholder={label}
                          placeholderTextColor="#979797"
                          style={styles.input}
                          onChangeText={handleChange(key)}
                          onBlur={handleBlur(key)}
                          value={values[key]}
                          autoCapitalize={key === 'email' ? 'none' : 'sentences'}
                        />
                      </View>
                    </View>
                  );
                })}

                <View style={{ marginVertical: 10 }}>
                  <DeleteButton
                    customContainerStyles={styles.changePasswordButton}
                    customTextStyle={styles.changePasswordText}
                    title="Modifier mon mot de passe"
                  />
                </View>

                {/* Diplômes */}
                <Text style={styles.text}>Diplôme(s)</Text>
                <View style={styles.inputWithButtonContainer}>
                  <TextInput
                    placeholder="Entre le nom de ton diplôme"
                    placeholderTextColor="#979797"
                    style={styles.inputWithButton}
                    value={diplomasTerm}
                    onChangeText={setDiplomasTerm}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      values.diplomas.push(diplomasTerm);
                      state.arrayofdiplomas.push(diplomasTerm);
                      setDiplomasTerm('');
                      setRefresh(!refresh);
                    }}
                  >
                    <FontAwesome name="plus-square" size={25} color="#2CDEE4" />
                  </TouchableOpacity>
                </View>

                <FlatList
                  data={state.arrayofdiplomas}
                  renderItem={({ item, index }) => (
                    <View>
                      <View style={styles.itemDiplomas}>
                        <Text style={styles.itemText}>{item}</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          state.arrayofdiplomas.splice(index, 1);
                          values.diplomas.splice(index, 1);
                          setRefresh(!refresh);
                        }}
                        style={styles.deleteContainer}
                      >
                        <Entypo name="cross" size={18} />
                      </TouchableOpacity>
                    </View>
                  )}
                  keyExtractor={(item) => item}
                />

                {/* Spécialités */}
                <Text style={[styles.text, { marginTop: 20 }]}>Spécialité(s)</Text>
                <View style={styles.inputWithButtonContainer}>
                  <TextInput
                    placeholder="Entre une spécialité"
                    placeholderTextColor="#979797"
                    style={styles.inputWithButton}
                    value={specialitiesTerm}
                    onChangeText={setSpecialitiesTerm}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      state.specData.push(specialitiesTerm);
                      values.specialties.push(specialitiesTerm);
                      setSpecialitiesTerm('');
                      setRefresh(!refresh);
                    }}
                  >
                    <FontAwesome name="plus-square" size={25} color="#2CDEE4" />
                  </TouchableOpacity>
                </View>

                <FlatList
                  data={state.specData}
                  numColumns={3}
                  renderItem={({ item, index }) => (
                    <View style={{ marginHorizontal: 7.5 }}>
                      <View style={styles.item}>
                        <Text style={styles.itemText}>{item}</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          state.specData.splice(index, 1);
                          values.specialties.splice(index, 1);
                          setRefresh(!refresh);
                        }}
                        style={styles.deleteContainer}
                      >
                        <Entypo name="cross" size={18} />
                      </TouchableOpacity>
                    </View>
                  )}
                  keyExtractor={(item) => item}
                />

                {/* Sélecteur de salle */}
                <Text style={styles.text}>Dans quelle salle pratiques-tu ?</Text>
                <View style={{ alignItems: 'center' }}>
                  <SelectDropdown
                    buttonStyle={styles.dropdownButton}
                    buttonTextStyle={styles.dropdownButtonText}
                    data={state.Gymdata}
                    defaultButtonText={state.User.gym.name}
                    onSelect={(selectedItem) => {
                      setFieldValue('gymPlace', [selectedItem]);
                    }}
                    renderDropdownIcon={() => (
                      <AntDesign name="down" size={18} color="black" />
                    )}
                    buttonTextAfterSelection={(selectedItem) => selectedItem.name}
                    rowTextForSelection={(item) => item.name}
                  />
                </View>

                <View style={styles.validateButton}>
                  <Button
                    loading={false}
                    title="Valider les changements"
                    customTextStyle={styles.validateButtonText}
                    onPress={() => controller.onSave(values)}
                  />
                </View>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default ProfileCoachScreenView;

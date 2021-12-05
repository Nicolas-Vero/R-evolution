import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  FlatList,
} from 'react-native';
import { FieldArray, Formik } from 'formik';
import { AntDesign } from '@expo/vector-icons';
import { Avatar, CheckBox } from 'react-native-elements';
import { Button, DeleteButton } from '../../components/Button';
import HeaderLight from '../../components/HeaderLight';
import { FontAwesome } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown';
import styles from './ProfileCoachScreenStyle';
import AbstractScreenView from '../../components/abstracts/AbstractScreen/AbstractScreenView';
import { isIphoneX } from 'react-native-iphone-x-helper';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Entypo } from '@expo/vector-icons';

import { upload_file } from '../../api/File';
import { updateCoach } from '../../api/Coach';
export default class ProfileCoachScreenView extends AbstractScreenView {
  render() {
    // const { navigation } = this.compoment.props;
    var term = '';
    const arrayhelper = [];
    if (!this.component.state.loaded) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ScrollView>
            <Formik
              initialValues={{
                first_name: this.component.state.User.first_name,
                last_name: this.component.state.User.last_name,
                email: this.component.state.User.email,
                phone: this.component.state.User.phone,
                specialties: this.component.state.specData,
                diplomas: this.component.state.arrayofdiplomas,
                profile_picture_url:
                  this.component.state.User.profile_picture_url,
              }}
              onSubmit={(values) => onContinuePress(values)}>
              {({ handleChange, handleBlur, setFieldValue, values }) => (
                <View>
                  <View style={{ paddingTop: isIphoneX() ? 30 : 10 }}>
                    <View style={styles.header}>
                      <View style={styles.headerLeft}>
                        <HeaderLight />
                      </View>
                      <View style={styles.headerMidle}>
                        <FieldArray
                          name="profile_picture_url"
                          render={(arrayhelper) => (
                            <TouchableOpacity
                              onPress={(item) => {
                                this.controller.pickImage(arrayhelper, item);
                              }}>
                              {this.component.state.image.uri ? (
                                <Avatar
                                  size={105}
                                  rounded
                                  source={{
                                    uri: this.component.state.image.uri,
                                  }}
                                />
                              ) : (
                                <Image
                                  style={styles.previewImage}
                                  source={require('../../../assets/images/AddPhoto.png')}
                                />
                              )}
                            </TouchableOpacity>
                          )}
                        />
                      </View>
                      <View style={styles.headerRight}></View>
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
                        value={values.gender}
                        onPress={() => setFieldValue('gender', 'male')}
                      />
                      <CheckBox
                        checkedColor="#2CDEE4"
                        containerStyle={styles.checkBox}
                        title="Mme"
                        textStyle={{ color: 'white' }}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="dot-circle-o"
                        checked={values.gender === 'female'}
                        value={values.gender}
                        onPress={() => setFieldValue('gender', 'female')}
                      />
                    </View>
                    <Text style={styles.text}>Prénom</Text>
                    <View style={styles.inputContainer}>
                      <TextInput
                        placeholder="Nom"
                        placeholderTextColor="#979797"
                        style={styles.input}
                        onChangeText={handleChange('first_name')}
                        onBlur={handleBlur('first_name')}
                        value={values.first_name}
                      />
                    </View>
                    <Text style={styles.text}>Nom</Text>
                    <View style={styles.inputContainer}>
                      <TextInput
                        placeholder="Prénom"
                        placeholderTextColor="#979797"
                        style={styles.input}
                        onChangeText={handleChange('last_name')}
                        onBlur={handleBlur('last_name')}
                        value={values.last_name}
                      />
                    </View>
                    <Text style={styles.text}>Adresse e-mail</Text>
                    <View style={styles.inputContainer}>
                      <TextInput
                        placeholder="Email"
                        placeholderTextColor="#979797"
                        style={styles.input}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                      />
                    </View>
                    <Text style={styles.text}>Téléphone</Text>
                    <View style={styles.inputContainer}>
                      <TextInput
                        placeholder="Téléphone"
                        placeholderTextColor="#979797"
                        style={styles.input}
                        onChangeText={handleChange('phone')}
                        onBlur={handleBlur('phone')}
                        value={values.phone}
                      />
                    </View>
                    <View style={{ marginVertical: 10 }}>
                      <DeleteButton
                        customContainerStyles={styles.changePasswordButton}
                        customTextStyle={styles.changePasswordText}
                        title="Modifier mon mot de passe"
                      />
                    </View>
                    <View style={styles.inputContainer}>
                      <Text style={styles.text}>Diplôme(s)</Text>
                      <FieldArray
                        render={() => (
                          <View style={styles.inputWithButtonContainer}>
                            <TextInput
                              placeholder="Entre le nom de ton dîplôme"
                              placeholderTextColor="#979797"
                              name="diplomas"
                              value={this.component.state.DiplomasTerm}
                              onChangeText={(text) => {
                                this.component.setState({
                                  DiplomasTerm: text,
                                });
                              }}
                              style={styles.inputWithButton}
                            />
                            <TouchableOpacity
                              onPress={() => {
                                this.component.state.arrayofdiplomas.push(
                                  this.component.state.DiplomasTerm,
                                );
                                this.component.setState({
                                  refresh: !this.component.state.refresh,
                                });
                                //TODO Diplomas, pas spécialités
                                values.diplomas.push(
                                  this.component.state.DiplomasTerm,
                                );
                              }}>
                              <View style={styles.addButton}>
                                <FontAwesome
                                  name="plus-square"
                                  size={25}
                                  color="#2CDEE4"
                                />
                              </View>
                            </TouchableOpacity>
                          </View>
                        )}
                      />
                    </View>
                    <View style={styles.container3}>
                      <FlatList
                        data={this.component.state.arrayofdiplomas}
                        // numColumns={3}
                        renderItem={({ item, index }) => {
                          return (
                            <View>
                              <View style={[styles.itemDiplomas]}>
                                <Text style={styles.itemText}>{item}</Text>
                              </View>
                              <TouchableOpacity
                                onPress={() => {
                                  if (index > -1) {
                                    this.component.state.arrayofdiplomas.splice(
                                      index,
                                      1,
                                    );
                                    values.diplomas.splice(index, 1);
                                    this.component.setState({
                                      refresh: !this.component.state.refresh,
                                    });
                                  }
                                }}
                                style={styles.deleteContainer}>
                                <Entypo name="cross" size={18} />
                              </TouchableOpacity>
                            </View>
                          );
                        }}
                        keyExtractor={(item) => item}
                        //   extraData={selectedId}
                      />
                    </View>
                    <Text style={[styles.text, { marginTop: 20 }]}>
                      Spécialité(s)
                    </Text>
                    <View style={[styles.inputContainer, { marginTop: 5 }]}>
                      <FieldArray
                        render={(arrayhelper) => (
                          <View style={styles.inputWithButtonContainer}>
                            <TextInput
                              placeholder="Entre une spécialité"
                              placeholderTextColor="#979797"
                              name="spécialité"
                              value={this.component.state.SpecialitiesTerm}
                              onChangeText={(text) => {
                                this.component.setState({
                                  SpecialitiesTerm: text,
                                });
                              }}
                              style={styles.inputWithButton}
                            />
                            <TouchableOpacity
                              onPress={() => {
                                this.component.setState({
                                  refresh: !this.component.state.refresh,
                                });
                                this.component.state.specData.push(
                                  this.component.state.SpecialitiesTerm,
                                );
                                // values.specialties.push(
                                //   this.component.state.SpecialitiesTerm,
                                // );
                                this.component.setState({
                                  refresh: !this.component.state.refresh,
                                });
                              }}>
                              <View style={styles.addButton}>
                                <FontAwesome
                                  name="plus-square"
                                  size={25}
                                  color="#2CDEE4"
                                />
                              </View>
                            </TouchableOpacity>
                          </View>
                        )}
                      />
                      <FlatList
                        style={{ marginTop: 5 }}
                        data={this.component.state.specData}
                        numColumns={3}
                        keyExtractor={(item) => item}
                        renderItem={({ item, index }) => {
                          return (
                            <View
                              style={{
                                marginLeft: index === 0 ? 0 : 7.5,
                                marginRight: 7.5,
                              }}>
                              <View style={styles.item}>
                                <Text style={styles.itemText}>{item}</Text>
                              </View>
                              <TouchableOpacity
                                onPress={() => {
                                  // const index =
                                  //   this.component.state.specData.indexOf(
                                  //     item,
                                  //   );

                                  // if (index > -1) {
                                  //   this.component.state.specData.splice(
                                  //     index,
                                  //     1,
                                  //   );
                                  values.specialties.splice(index, 1);
                                  this.component.setState({
                                    refresh: !this.component.state.refresh,
                                  });
                                }}
                                style={styles.deleteContainer}>
                                <Entypo name="cross" size={18} />
                              </TouchableOpacity>
                            </View>
                          );
                        }}
                      />
                    </View>
                    <View>
                      <Text style={styles.text}>
                        Dans quelle salle pratiques-tu ?
                      </Text>
                      <View style={{ alignItems: 'center' }}>
                        <SelectDropdown
                          buttonStyle={styles.dropdownButton}
                          buttonTextStyle={styles.dropdownButtonText}
                          rowTextStyle={styles.dropdownRowText}
                          dropdownStyle={styles.dropdownBg}
                          rowStyle={styles.dropdownRow}
                          data={this.component.state.Gymdata}
                          defaultButtonText={this.component.state.User.gym.name}
                          onSelect={(selectedItem, index) => {
                            if (
                              arrayhelper?.form?.values?.gymPlace?.length > 1
                            ) {
                              arrayhelper?.pop();
                            } else {
                            }
                            arrayhelper?.push(selectedItem);
                          }}
                          renderDropdownIcon={() => {
                            return (
                              <AntDesign name="down" size={18} color="black" />
                            );
                          }}
                          dropdownIconPosition={'right'}
                          buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem.name;
                          }}
                          rowTextForSelection={(item, index) => {
                            return item.name;
                          }}
                        />
                      </View>
                    </View>
                    <View style={styles.validateButton}>
                      <Button
                        loading={false}
                        title="Valider les changements"
                        customTextStyle={styles.validateButtonText}
                        onPress={() => {
                          this.controller.onSave(values);
                        }}
                      />
                    </View>
                  </View>
                </View>
              )}
            </Formik>
            <KeyboardSpacer />
          </ScrollView>
        </View>
      );
    }
  }
}

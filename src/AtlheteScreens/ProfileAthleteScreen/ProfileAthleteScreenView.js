import React, { useEffect, useState, useCallback } from 'react';
import {
  ScrollView,
  ActivityIndicator,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Avatar, CheckBox } from 'react-native-elements';
import { Formik } from 'formik';
import SelectDropdown from 'react-native-select-dropdown';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { AntDesign } from '@expo/vector-icons';
import { widthPercentageToDP } from 'react-native-responsive-screen';

import HeaderLight from '../../components/HeaderLight';
import styles from './ProfileAthleteScreenStyle';
import { Button, DeleteButton } from '../../components/Button';

const ProfileAthleteScreenView = ({ navigation, route }) => {
  const [user, setUser] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [multi, setMulti] = useState([8, 18]);
  const [gym, setGym] = useState('');
  const [gymData, setGymData] = useState([]);
  const [selectedDays, setSelectedDays] = useState([
    { day: 'L', selected: false },
    { day: 'M', selected: false },
    { day: 'ME', selected: false },
    { day: 'J', selected: false },
    { day: 'V', selected: false },
    { day: 'S', selected: false },
    { day: 'D', selected: false },
  ]);

  // Simule le chargement initial
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Simule un appel API
    const fetchUserData = async () => {
      // Remplace ceci par ton vrai appel
      const mockUser = {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        gender: 'male',
        health_issues: false,
        health_problem_description: '',
        is_monday_preferred: false,
        is_tuesday_preferred: false,
        is_wednesday_preferred: false,
        is_thursday_preferred: false,
        is_friday_preferred: false,
        is_saturday_preferred: false,
        is_sunday_preferred: false,
        preferred_gym_id: null,
        preferred_time_start: 8,
        preferred_time_end: 18,
        profile_picture_url: '',
      };
      setUser(mockUser);
      setGym('Choisir une salle');
      setMulti([mockUser.preferred_time_start, mockUser.preferred_time_end]);
      setLoaded(true);
    };

    fetchUserData();
  }, []);

  const pickImage = useCallback(() => {
    // Implémente ici ton sélecteur d’image
  }, []);

  const onSave = (values) => {
    console.log('Submitted values:', values);
  };

  if (!loaded || !user) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Formik
          initialValues={{
            gender: user.gender,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone,
            health_issues: user.health_issues,
            health_problem_description: user.health_problem_description,
            days_preference: {
              is_monday_preferred: user.is_monday_preferred,
              is_tuesday_preferred: user.is_tuesday_preferred,
              is_wednesday_preferred: user.is_wednesday_preferred,
              is_thursday_preferred: user.is_thursday_preferred,
              is_friday_preferred: user.is_friday_preferred,
              is_saturday_preferred: user.is_saturday_preferred,
              is_sunday_preferred: user.is_sunday_preferred,
            },
            preferred_gym_id: user.preferred_gym_id,
            time_preference: {
              start_time: user.preferred_time_start,
              end_time: user.preferred_time_end,
            },
          }}
          onSubmit={onSave}>
          {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
            <View style={styles.content}>
              <View style={styles.header}>
                <HeaderLight />
                <TouchableOpacity onPress={pickImage}>
                  {imageUri ? (
                    <Avatar size={105} rounded source={{ uri: imageUri }} />
                  ) : user.profile_picture_url ? (
                    <Avatar size={105} rounded source={{ uri: user.profile_picture_url }} />
                  ) : (
                    <Image
                      style={styles.previewImage}
                      source={require('../../../assets/images/no_pp.jpg')}
                    />
                  )}
                </TouchableOpacity>
              </View>

              <View style={styles.checkboxContainer}>
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
                  textStyle={{ color: 'white' }}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="dot-circle-o"
                  checked={values.gender === 'female'}
                  onPress={() => setFieldValue('gender', 'female')}
                />
              </View>

              {['first_name', 'last_name', 'email', 'phone'].map((field, idx) => (
                <View key={idx}>
                  <Text style={styles.text}>
                    {field === 'first_name'
                      ? 'Prénom'
                      : field === 'last_name'
                        ? 'Nom'
                        : field === 'email'
                          ? 'Adresse e-mail'
                          : 'Téléphone'}
                  </Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholder={field}
                      placeholderTextColor="#979797"
                      style={styles.input}
                      autoCapitalize="none"
                      value={values[field]}
                      onChangeText={handleChange(field)}
                      onBlur={handleBlur(field)}
                    />
                  </View>
                </View>
              ))}

              <View style={styles.changePasswordContainer}>
                <DeleteButton
                  customContainerStyles={styles.changePasswordButton}
                  customTextStyle={styles.changePasswordText}
                  title="Modifier mon mot de passe"
                />
              </View>

              <Text style={styles.text}>Des problèmes de santé à signaler ?</Text>
              <SelectDropdown
                data={['OUI', 'NON']}
                defaultButtonText={values.health_issues ? 'OUI' : 'NON'}
                buttonStyle={styles.dropdownButton}
                buttonTextStyle={styles.dropdownButtonText}
                onSelect={(selectedItem) =>
                  setFieldValue('health_issues', selectedItem === 'OUI')
                }
                renderDropdownIcon={() => <AntDesign name="down" size={18} color="black" />}
                dropdownIconPosition="right"
              />

              <Text style={styles.text}>Informations complémentaires</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  multiline
                  value={values.health_problem_description}
                  onChangeText={handleChange('health_problem_description')}
                  placeholder="Description"
                  placeholderTextColor="#979797"
                  style={styles.textArea}
                />
              </View>

              <Text style={styles.text}>Où souhaites-tu t’entraîner ?</Text>
              <SelectDropdown
                data={gymData}
                defaultButtonText={gym}
                buttonStyle={styles.dropdownButton}
                buttonTextStyle={styles.dropdownButtonText}
                onSelect={(selectedItem) => {
                  setFieldValue('preferred_gym_id', selectedItem.id);
                }}
                renderDropdownIcon={() => <AntDesign name="down" size={18} color="black" />}
                dropdownIconPosition="right"
                buttonTextAfterSelection={(item) => item.name}
                rowTextForSelection={(item) => item.name}
              />

              <Text style={styles.text}>À quel moment de la journée ?</Text>
              <View style={styles.center}>
                <Text style={styles.text}>
                  ENTRE <Text style={styles.subTitleColored}>{multi[0]}H</Text> ET{' '}
                  <Text style={styles.subTitleColored}>{multi[1]}H</Text>
                </Text>
              </View>
              <MultiSlider
                values={multi}
                sliderLength={widthPercentageToDP(92)}
                onValuesChange={(values) => {
                  setMulti(values);
                  setFieldValue('time_preference', {
                    start_time: values[0],
                    end_time: values[1],
                  });
                }}
                min={0}
                max={24}
                step={1}
                snapped
                trackStyle={{ height: 5 }}
                trackStyle={styles.sliderTrack}
                markerStyle={styles.sliderMarker}
                selectedStyle={styles.sliderSelected}
              />

              <Text style={styles.text}>Quel(s) jour(s) ?</Text>
              <FlatList
                horizontal
                data={selectedDays}
                keyExtractor={(item) => item.day}
                renderItem={({ item }) => {
                  const isSelected = item.selected;
                  const backgroundColor = isSelected ? '#2CDEE4' : '#1E2026';
                  const textColor = isSelected ? 'black' : 'white';

                  return (
                    <TouchableOpacity
                      onPress={() => {
                        const newDays = selectedDays.map((d) =>
                          d.day === item.day ? { ...d, selected: !d.selected } : d
                        );
                        setSelectedDays(newDays);
                        const keyMap = {
                          L: 'is_monday_preferred',
                          M: 'is_tuesday_preferred',
                          ME: 'is_wednesday_preferred',
                          J: 'is_thursday_preferred',
                          V: 'is_friday_preferred',
                          S: 'is_saturday_preferred',
                          D: 'is_sunday_preferred',
                        };
                        setFieldValue('days_preference', {
                          ...values.days_preference,
                          [keyMap[item.day]]: !values.days_preference[keyMap[item.day]],
                        });
                      }}>
                      <View style={[styles.dayContainer, { backgroundColor }]}>
                        <View style={styles.dayTextContainer}>
                          <Text style={[styles.dayTextNum, { color: textColor }]}>
                            {item.day}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />

              <View style={styles.validateButton}>
                <Button
                  title="Valider les changements"
                  customTextStyle={styles.validateButtonText}
                  onPress={handleSubmit}
                />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default ProfileAthleteScreenView;

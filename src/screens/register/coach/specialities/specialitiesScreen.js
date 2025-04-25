import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Keyboard,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import * as Yup from 'yup';
import { Formik, FieldArray, Field } from 'formik';
import { FontAwesome } from '@expo/vector-icons';

import { get_specialities } from '../../../../api/ReferenceData';
import Header from '../../../../components/Header';
import RegisterStepImageView from '../../../../components/register/registerStepImage/RegisterStepImageView';
import { Button } from '../../../../components/Button';
import styles from './specialitiesStyle';

const SpecialitiesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const passItem = route.params?.item || {}; // Évite undefined si aucun paramètre n'est passé

  const [specData, setSpecData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [term, setTerm] = useState('');

  useEffect(() => {
    get_specialities().then((res) => {
      setSpecData(res.data);
      setIsLoaded(true);
    });
  }, []);

  const onNavigate = (item) => {
    navigation.navigate('SelectGymCoachScreen', { item });
  };

  const renderSpecialitiesList = (errors, arrayhelper) => {
    return (
      <View>
        <ScrollView style={styles.goalContainer}>
          <FlatList
            data={specData}
            extraData={specData}
            renderItem={({ item }) => {
              const backgroundColor = item.selected ? '#2CDEE4' : 'transparent';
              const borderColor = item.selected ? 'transparent' : 'white';
              const color = item.selected ? 'black' : 'white';

              return (
                <TouchableOpacity
                  onPress={() => {
                    item.selected = !item.selected;
                    if (arrayhelper.form.values.specialties.includes(item.value)) {
                      arrayhelper.remove(item.value);
                    } else {
                      arrayhelper.push(item.value);
                    }
                  }}>
                  <View
                    style={{
                      ...styles.goalItem,
                      backgroundColor,
                      borderColor,
                    }}>
                    <Text
                      style={{
                        ...styles.goalIemText,
                        color,
                      }}>
                      {item.value}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.value}
            numColumns={3}
          />
        </ScrollView>
        {errors.specialties && (
          <Text style={styles.errorText}>Sélectionne ou ajoute une spécialité</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#060606', '#2D333C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}>
        <SafeAreaView onPress={Keyboard.dismiss} style={styles.safeArea}>
          <Header title="LET'S GO" />

          <RegisterStepImageView step={11} />
          <View style={styles.content}>
            <Formik
              initialValues={{ specialties: [] }}
              onSubmit={(values) => {
                const item = { ...passItem, ...values };
                onNavigate(item);
              }}
              validationSchema={Yup.object().shape({
                specialties: Yup.array().min(1, 'Requis'),
              })}>
              {({ handleSubmit, isValid, errors }) => (
                <View style={styles.content}>
                  <Field name="specialties" id="specialties">
                    {({ form }) => (
                      <View style={{ height: heightPercentageToDP(72) }}>
                        <Text style={styles.title}>SPÉCIALITÉ(S)</Text>
                        <Text style={styles.subTitle}>
                          Sélectionne une ou plusieurs spécialités
                        </Text>
                        <View style={{ marginTop: 26, marginBottom: 26 }}>
                          <FieldArray
                            name="specialties"
                            render={(arrayhelper) => (
                              <View>
                                <View style={{ marginBottom: 24 }}>
                                  {renderSpecialitiesList(errors, arrayhelper)}
                                </View>
                                <View style={styles.inputContainer}>
                                  <TextInput
                                    placeholder="Ajouter une spécialité"
                                    placeholderTextColor="#979797"
                                    value={term}
                                    onChangeText={setTerm}
                                    style={styles.input}
                                  />
                                  <TouchableOpacity
                                    onPress={() => {
                                      if (term) {
                                        setSpecData([...specData, { value: term }]);
                                        setTerm('');
                                      }
                                    }}>
                                    <View style={styles.addGoalButtonContainer}>
                                      <FontAwesome
                                        name="plus-square"
                                        size={25}
                                        color="#2CDEE4"
                                      />
                                    </View>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            )}
                          />
                        </View>
                      </View>
                    )}
                  </Field>
                  <Button
                    loading={false}
                    disabled={!isValid}
                    title="Suivant"
                    customTextStyle={{
                      fontFamily: 'RobotoBold',
                      fontSize: 17,
                    }}
                    onPress={handleSubmit}
                  />
                </View>
              )}
            </Formik>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

export default SpecialitiesScreen;

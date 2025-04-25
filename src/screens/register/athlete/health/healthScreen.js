import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Keyboard,
  TextInput,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import SelectDropdown from 'react-native-select-dropdown';
import { AntDesign } from '@expo/vector-icons';
import Header from '../../../../components/Header';
import RegisterStepImageView from '../../../../components/register/registerStepImage/RegisterStepImageView';
import { Button } from '../../../../components/Button';
import styles from './healthStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HealthScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const passItem = route.params || {};
  const data = ['OUI', 'NON'];

  const validationSchema = Yup.object().shape({
    health_issues: Yup.boolean(),
    health_problem_description: Yup.string(),
  });

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#060606', '#2D333C']} style={styles.background}>

        <SafeAreaView style={styles.safeArea} onPress={Keyboard.dismiss}>
          <Header title="LET'S GO" />
          <RegisterStepImageView step={4} />
          <Formik
            initialValues={{
              health_issues: '',
              health_problem_description: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              const item = { ...passItem, ...values };
              navigation.navigate('SelectGymScreen', { item });
            }}
          >
            {({ handleSubmit, setFieldValue, values }) => (
              <ScrollView
                style={{ flex: 1, }}
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}
                keyboardShouldPersistTaps="handled"
              >

                <View style={styles.healthContainer}>

                  <View style={styles.inputContainer}>
                    <Text style={styles.subTitle}>DES PROBLÈMES DE SANTÉ À SIGNALER ?</Text>


                    <TextInput
                      style={styles.input}
                      placeholder="Description"
                      placeholderTextColor="#979797"
                      multiline
                      onChangeText={(text) =>
                        setFieldValue('health_problem_description', text)
                      }
                      value={values.health_problem_description}
                    />
                  </View>
                  <>
                    <View style={styles.inputContainer}>
                      <Text style={styles.subTitle}>INFORMATIONS COMPLÉMENTAIRES</Text>

                      <TextInput
                        style={styles.input}
                        placeholder="Description"
                        placeholderTextColor="#979797"
                        multiline
                        onChangeText={(text) =>
                          setFieldValue('health_problem_description', text)
                        }
                        value={values.health_problem_description}
                      />
                    </View>
                  </>

                </View>
                <View style={styles.bottom}>
                  <Button
                    title="Suivant"
                    disabled={false}
                    customTextStyle={styles.nextButtonText}
                    onPress={handleSubmit}
                  />

                </View>
              </ScrollView>
            )}
          </Formik>

        </SafeAreaView>
      </LinearGradient>

    </View >
  );
};

export default HealthScreen;

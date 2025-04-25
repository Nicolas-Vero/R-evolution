import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import { get_gym } from '../api/ReferenceData';
import { Button } from './Button';
import Header from './Header';
import { LinearGradient } from 'expo-linear-gradient';
import * as Yup from 'yup';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Formik } from 'formik';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

const TrainingPlace = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [gymData, setGymData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchGyms = async () => {
      try {
        const res = await get_gym();
        setGymData(res.data);
      } catch (error) {
        console.error('Error fetching gym data:', error);
      } finally {
        setIsLoaded(true);
      }
    };
    fetchGyms();
  }, []);

  if (!isLoaded) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }
  const passItem = route.params?.item || {};

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#060606', '#2D333C']} style={styles.background}>
        <ScrollView>
          <SafeAreaView style={styles.safeArea}>
            <Header title="LET'S GO" />
            <View style={styles.imageContainer}>
              <Image
                source={require('../../assets/images/Group_4.png')}
                style={styles.image}
              />
            </View>
            <View style={styles.formContainer}>
              <Formik
                initialValues={{ gym_id: '' }}
                onSubmit={(values) => {
                  navigation.navigate('avatar', { item: { ...passItem, ...values } });
                }}
                validationSchema={Yup.object().shape({
                  gym_id: Yup.string().required('Requis'),
                })}>
                {({ handleSubmit, setFieldValue, isValid }) => (
                  <View>
                    <Text style={styles.title}>LIEU D'EXPÉRIENCE</Text>
                    <Text style={styles.subtitle}>Dans quelle salle pratiques-tu ?</Text>
                    <SelectDropdown
                      buttonStyle={styles.dropdownButton}
                      data={gymData}
                      defaultButtonText="Recherche le nom de ta salle"
                      onSelect={(selectedItem) => setFieldValue('gym_id', selectedItem.id)}
                      renderDropdownIcon={() => <AntDesign name="down" size={24} color="white" />}
                      dropdownIconPosition="right"
                      buttonTextAfterSelection={(selectedItem) => selectedItem.name}
                      rowTextForSelection={(item) => item.name}
                      rowTextStyle={styles.dropdownRowText}
                      dropdownStyle={styles.dropdownStyle}
                    />
                    <Button
                      loading={false}
                      disabled={!isValid}
                      title="Suivant"
                      customTextStyle={styles.buttonText}
                      onPress={handleSubmit}
                    />
                  </View>
                )}
              </Formik>
            </View>
          </SafeAreaView>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' },
  background: { flex: 1 },
  safeArea: { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  imageContainer: { alignItems: 'center' },
  image: { width: wp(80), height: hp(30), resizeMode: 'contain' },
  formContainer: { paddingHorizontal: 16, flex: 1 },
  title: { fontWeight: 'bold', fontSize: 20, color: '#FFFFFF', textAlign: 'center', marginVertical: 20 },
  subtitle: { fontWeight: 'bold', fontSize: 18, color: '#FFFFFF', textAlign: 'center', marginBottom: 30 },
  dropdownButton: { width: wp(90), borderRadius: 5, backgroundColor: '#282C3A' },
  dropdownRowText: { color: 'white', fontSize: 15 },
  dropdownStyle: { backgroundColor: '#282C3A', borderRadius: 5 },
  buttonText: { fontFamily: 'RobotoBold', fontSize: 17 },
});

export default TrainingPlace;

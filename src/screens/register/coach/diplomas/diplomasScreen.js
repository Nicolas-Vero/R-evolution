import React, { useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import RegisterStepImageView from '../../../../components/register/registerStepImage/RegisterStepImageView';
import { Button } from '../../../../components/Button';
import Header from '../../../../components/Header';
import styles from './diplomasStyle';
import { FlatList } from 'react-native-gesture-handler';

const DiplomasScreen = () => {
  const navigation = useNavigation(); // Récupérer la navigation
  const route = useRoute(); // Récupérer les paramètres de la route

  const [diplomas, setDiplomas] = useState([]);
  const [diplomasInput, setDiplomasInput] = useState('');
  const [error, setError] = useState('');

  const onAddDiplomas = () => {
    if (diplomasInput === '') {
      return;
    }
    setDiplomas([...diplomas, diplomasInput]);
    setDiplomasInput('');
    setError('');
  };

  const onRemoveDiplomas = (index) => {
    const updatedDiplomas = [...diplomas];
    updatedDiplomas.splice(index, 1);
    setDiplomas(updatedDiplomas);
    if (updatedDiplomas.length === 0) {
      setError('Veuillez ajouter un diplôme');
    }
  };

  const onNavigate = () => {
    if (diplomas.length === 0) {
      setError('Veuillez ajouter un diplôme');
      return;
    }

    // Récupérer les paramètres passés depuis l'écran précédent
    const passItem = route.params || {}; // Vérifier si params existe
    navigation.navigate('ExperienceCoachScreen', {
      item: { ...passItem, diplomas },
    });
  };

  const renderDiplomasInput = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TextInput
        placeholderTextColor="#979797"
        placeholder="Entre le nom de ton diplôme"
        value={diplomasInput}
        onChangeText={setDiplomasInput}
        style={styles.input}
      />
      <TouchableOpacity onPress={onAddDiplomas}>
        <View style={styles.addDiplomasContainer}>
          <FontAwesome name="plus-square" size={24} color="#2CDEE4" />
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderDiplomas = () => (
    <FlatList
      style={{ marginBottom: 50, paddingTop: 10 }}
      data={diplomas}
      contentContainerStyle={{
        paddingBottom: 50,
      }}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <View>
          <View style={styles.itemDiplomas}>
            <Text style={styles.diplomasText}>{item}</Text>
          </View>
          <View style={styles.removeDiplomas}>
            <TouchableOpacity onPress={() => onRemoveDiplomas(index)}>
              <Entypo name="cross" size={18} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#060606', '#2D333C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}>
        <Header title="LET'S GO" />
        <SafeAreaView onPress={Keyboard.dismiss} style={styles.safeArea}>
          <RegisterStepImageView step={9} />
          <View style={styles.content}>
            <View style={styles.alignCenter}>
              <View
                style={{
                  height: heightPercentageToDP(72),
                }}>
                <Text style={styles.title}>DIPLÔME(S)</Text>
                <View style={styles.container}>
                  <View style={styles.diplomasContainerr}>
                    {renderDiplomasInput()}
                    {error !== '' ? <Text style={styles.errorText}>{error}</Text> : null}
                    {renderDiplomas()}
                  </View>
                </View>
                <Button
                  loading={false}
                  title="Suivant"
                  customTextStyle={styles.nextButtonText}
                  onPress={onNavigate}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

export default DiplomasScreen;

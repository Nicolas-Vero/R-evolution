import React from 'react';
import { View, Text, SafeAreaView, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../../components/Button';
import styles from './entryStyle';

const EntryScreen = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../../../../assets/images/Photo_page_accueil.jpg')}
      style={styles.backgroundContainer}>
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea} />
        <View style={styles.headerContaner}>
          <Image
            source={require('../../../../assets/images/logo.png')}
            style={styles.logoImage}
          />
          <Text style={styles.title}>
            “Une évolution est une révolution{'\n'} sans en avoir l’R”
          </Text>
          <Text style={styles.subtitle}> -P.-H. Cami</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Rejoindre"
            customContainerStyles={styles.registerButton}
            customTextStyle={styles.buttonRegisterText}
            onPress={() => navigation.navigate('RegisterScreen')}
          />
          <Button
            title="Se connecter"
            customTextStyle={styles.buttonLoginText}
            customContainerStyles={styles.loginButton}
            onPress={() => navigation.navigate('LoginScreen')}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default EntryScreen;

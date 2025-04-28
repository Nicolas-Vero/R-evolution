import React, { useEffect, useState, useCallback } from 'react';
import { View, TouchableOpacity, Image, Text, Platform, Alert, SafeAreaView } from 'react-native';
import { manipulateAsync } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { Avatar } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';

import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../../../components/Header';
import RegisterStepImageView from '../../../../components/register/registerStepImage/RegisterStepImageView';
import styles from './avatarStyle';
import {
  sign_up,
  athlete_login,
  get_athlete_me,
} from '../../../../api/Athlete';
import AuthService from '../../../../services/AuthService';
import { upload_profile_picture } from '../../../../api/File';
import SystemHelper from '../../../../helpers/SystemHelper';
import { Button } from '../../../../components/Button';
import { auth } from '../../../../api/Coach';

const AvatarScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const passItem = route.params?.item || {}; // Sécurise les paramètres reçus
  const isAthlete = passItem.userType === 'athlete';

  const [image, setImage] = useState(null);
  const [base64Image, setBase64Image] = useState('');
  const [isWorking, setIsWorking] = useState(false);

  // Demande de permissions pour la galerie
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission requise', 'Nous avons besoin de l\'accès à votre galerie.');
        }
      }
    })();
  }, []);

  const pickImage = useCallback(async () => {
    setImage(null);
    setBase64Image('');

    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const compressedImage = await manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 200, height: 200 } }],
        { compress: 0.7, base64: true },
      );

      setImage({ uri: result.assets[0].uri });
      setBase64Image(`data:image/jpeg;base64,${compressedImage.base64}`);
    }
  }, []);

  const upload = async (userId) => {
    if (base64Image !== '') {
      await upload_profile_picture(userId, isAthlete ? 'athlete' : 'coach', base64Image);
    }
  };

  const onRegister = async () => {
    if (isWorking) return;
    setIsWorking(true);

    try {
      console.log(passItem, '*************');
      // const expo_token = await AuthService.registerForPushNotificationsAsync();
      // if (expo_token) {
      //   passItem.expo_token = expo_token;
      // }

      // let res;
      // if (isAthlete) {
      //   res = await sign_up(passItem);
      // } else {
      //   res = await auth(passItem);
      // }

      // if (res.status === 200) {
      //   await upload(res.content.userId);
      //   navigation.popToTop();
      //   navigation.replace('LoginScreen');
      // }
    } catch (error) {
      console.error("Erreur d'inscription:", error);
    } finally {
      setIsWorking(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#060606', '#2D333C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}>
        <SafeAreaView style={styles.safeArea}>
          <Header title="LET'S GO" />
          <View style={styles.content}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <RegisterStepImageView step={isAthlete ? 8 : 13} />
              <Text style={styles.title}>PHOTO DE PROFIL</Text>
              <View style={{ marginTop: 56 }}>
                <Text style={styles.subTitle}>
                  {image ? "Superbe photo !" : "Ajoute une photo de profil"}
                </Text>
              </View>
              <View style={styles.photoPickerContainer}>
                <TouchableOpacity onPress={pickImage}>
                  {image ? (
                    <Avatar size="xlarge" rounded source={image} />
                  ) : (
                    <Image style={styles.previewImage} source={require('../../../../../assets/images/no_pp.jpg')} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.bottom}>
              <Button title="Créer ton compte" customTextStyle={styles.buttonText} onPress={onRegister} loading={isWorking} />
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

export default AvatarScreen;

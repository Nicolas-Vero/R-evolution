import React, { useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity, View, Text, SafeAreaView, ImageBackground, Linking } from 'react-native';
import HeaderSimple from '../../components/HeaderSimple';
import styles from './OffersTrainingsCoachScreenStyle';
import { heightPercentageToDP } from 'react-native-responsive-screen';
const OffersTrainingsCoachScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();

  const navigateToOffers = useCallback(() => {
    navigation.navigate('OffersCoachScreen');
  }, [navigation]);

  const openYoutube = useCallback(() => {
    Linking.openURL('https://youtube.com/playlist?list=PL3L9pkm9gco9vV1qusgw8R8WlYeqMpqBP');
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ height: heightPercentageToDP(65) }}>
        <HeaderSimple title="OFFRES ET FORMATIONS" />
        <View style={styles.centerAlign}>
          <TouchableOpacity onPress={navigateToOffers}>
            <ImageBackground
              source={require('../../../assets/images/offres.jpg')}
              imageStyle={styles.image}
              style={styles.offerImageContent}
            >
              <View style={styles.imageTextContainer}>
                <Text style={styles.title}>MES OFFRES</Text>
                <Text style={styles.subTitle}>
                  Crée et modifie tes offres sur-mesure
                </Text>
              </View>
              <View style={styles.buttonContainer}></View>
            </ImageBackground>
          </TouchableOpacity>

          <View style={styles.trainingContainer}>
            <TouchableOpacity onPress={openYoutube}>
              <ImageBackground
                imageStyle={styles.image}
                source={require('../../../assets/images/Formation.jpg')}
                style={styles.trainingImageContent}
              >
                <View style={styles.imageTextContainer}>
                  <Text style={styles.title}>LES FORMATIONS</Text>
                  <Text style={styles.subTitle}>
                    Accède aux modules de formation pour aiguiser tes compétences
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default OffersTrainingsCoachScreen;

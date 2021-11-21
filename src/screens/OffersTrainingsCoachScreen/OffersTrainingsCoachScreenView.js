import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, SafeAreaView, ImageBackground } from 'react-native';
import HeaderSimple from '../../components/HeaderSimple';
import styles from './OffersTrainingsCoachScreenStyle';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import AbstractScreenView from '../../components/abstracts/AbstractScreen/AbstractScreenView';
export default class OffersTrainingsCoachScreenView extends AbstractScreenView {
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={{ height: heightPercentageToDP(65) }}>
          <HeaderSimple title="OFFRES ET FORMATIONS" />
          <View style={styles.centerAlign}>
            <TouchableOpacity onPress={this.controller.navigateToOffers}>
              <ImageBackground
                source={require('../../../assets/images/offres.jpg')}
                imageStyle={styles.image}
                style={styles.offerImageContent}>
                <View style={styles.imageTextContainer}>
                  <Text style={styles.title}>MES OFFRES</Text>
                  <Text style={styles.subTitle}>
                    Créer et modifie tes offres sur-mesure
                  </Text>
                </View>
                <View style={styles.buttonContainer}></View>
              </ImageBackground>
            </TouchableOpacity>
            <View style={styles.trainingContainer}>
              <TouchableOpacity>
                <ImageBackground
                  imageStyle={styles.image}
                  source={require('../../../assets/images/Formation.jpg')}
                  style={styles.trainingImageContent}>
                  <View style={styles.imageTextContainer}>
                    <Text style={styles.title}>LES FORMATION</Text>
                    <Text style={styles.subTitle}>
                      Accède à la plateforme de formation
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

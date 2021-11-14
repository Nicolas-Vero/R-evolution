import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import HeaderSimple from '../../components/HeaderSimple';
import styles from './offersTrainingsCoachStyle';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
export default class offersTrainingsCoachScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <SafeAreaView style={{ height: heightPercentageToDP(65) }}>
          <HeaderSimple title="OFFRES ET FORMATIONS" />
          <View style={styles.centerAlign}>
            <TouchableOpacity onPress={() => navigate('offersCoachScreen')}>
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
              <TouchableOpacity onPress={() => navigate('offersScreen')}>
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

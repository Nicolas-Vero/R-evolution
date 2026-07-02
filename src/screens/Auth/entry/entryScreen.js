import React from 'react';
import { View, Text, SafeAreaView, ImageBackground, Image } from 'react-native';
import { Button } from '../../../components/Button';
import styles from './entryStyle';

export default class entryScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    fontsLoaded: false,
  };

  render() {
    const { navigate } = this.props.navigation;
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
              onPress={() => navigate('registerScreen')}
            />
            <Button
              title="Se connecter"
              customTextStyle={styles.buttonLoginText}
              customContainerStyles={styles.loginButton}
              onPress={() => navigate('loginScreen')}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

import React from 'react';
import {
  View,
  SafeAreaView,
  Image,
  TextInput,
  Keyboard,
  Text,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../../components/Header';
import { Button } from '../../../components/Button';
import styles from './forgetPasswordStyle';
import { coach_forgot_password } from '../../../api/Coach';
import { athlete_forgot_password } from '../../../api/Athlete';
import { userType } from '../../../api/Auth';
export default class forgotPasswordScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      error: null,
      timer: null,
    };
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  startTimerInterval = () => {
    this.setState({
      timer: 30,
      isTimerVisible: true,
    });

    this.interval = setInterval(() => {
      if (this.state.timer > 0) {
        this.setState({ timer: this.state.timer - 1 });
      } else {
        clearInterval(this.interval);
        this.setState({ isTimerVisible: false });
      }
    }, 1000);
  };

  onSendPress = async () => {
    const { email, timer } = this.state;
    if (!this.isEmailCorrect(email)) {
      return;
    }
    const user = await userType(email);
    if (user.status !== 200) {
      this.setState({
        error: "Cet email n'existe pas",
      });
    }

    if (user.content.type === 'coach') {
      await coach_forgot_password(email);
    } else if (user.content.type === 'athlete') {
      await athlete_forgot_password(email);
    }
    this.startTimerInterval();
  };

  isEmailCorrect = (email) => {
    if (!email) {
      this.setState({
        error: 'Veuillez renseigner votre email',
      });

      return false;
    }

    this.setState({
      error: null,
      passwordError: null,
    });
    return true;
  };

  render() {
    const { email, error, passwordError } = this.state;

    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['black', '#2D333C']}
          start={{
            x: 0,
            y: 0,
          }}
          end={{
            x: 1,
            y: 1,
          }}
          style={styles.background}>
          <Header />
          <SafeAreaView onPress={Keyboard.dismiss} style={styles.safeArea}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../../../assets/images/logo.png')}
                style={styles.image}></Image>
            </View>
            <View style={styles.content}>
              <View>
                <Text
                  style={{
                    color: '#fff',
                    marginBottom: 15,
                    fontFamily: 'Roboto',
                    fontSize: 14,
                  }}>
                  Tu recevras un e-mail pour réinitialiser ton mot de passe
                </Text>
                <TextInput
                  placeholderTextColor="#979797"
                  placeholder="Adresse e-mail"
                  style={styles.input}
                  onChangeText={(value) => this.setState({ email: value })}
                  autoCapitalize="none"
                  value={email}
                  onSubmitEditing={() => Keyboard && Keyboard.dismiss()}
                  returnKeyType="done"
                />
                {error && <Text style={styles.error}>{error}</Text>}
              </View>
              <View style={styles.buttonContainer}>
                {this.state.isTimerVisible ? (
                  <Text style={styles.h3}>
                    {`Envoi du mail de réinitialisation du mot de passe ${this.state.timer}`}
                  </Text>
                ) : (
                  <Button
                    style={styles.button}
                    loading={false}
                    title="Envoyer"
                    customTextStyle={styles.buttonText}
                    onPress={this.onSendPress}
                  />
                )}
              </View>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </View>
    );
  }
}

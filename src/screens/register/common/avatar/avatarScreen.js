import React from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  Image,
  SafeAreaView,
  Text,
} from 'react-native';
import { manipulateAsync } from 'expo-image-manipulator';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import * as ImagePicker from 'expo-image-picker';
import { Avatar } from 'react-native-elements';

import { LinearGradient } from 'expo-linear-gradient';
import { sign_up } from '../../../../api/Athlete';
import { auth } from '../../../../api/Coach';
import Header from '../../../../components/Header';
import RegisterStepImageView from '../../../../components/register/registerStepImage/RegisterStepImageView';
import { Button } from '../../../../components/Button';
import styles from './avatarStyle';
import { athlete_login, get_athlete_me } from '../../../../api/Athlete';
import AuthService from '../../../../services/AuthService';
import { upload_profile_picture } from '../../../../api/File';
import SystemHelper from '../../../../helpers/SystemHelper';
export default class avatarScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      image: {},
      isValid: true,
      isAthlete: props.navigation.state.params.item.userType === 'athlete',
      base64Image: '',
      isWorking: false,
    };
  }
  async componentDidMount() {
    {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    }
  }

  onRegister = async () => {
    if (this.state.isWorking) return;

    this.setState({ isWorking: true });
    const passItem = this.props.navigation.state.params.item;
    const expo_token = await AuthService.registerForPushNotificationsAsync();
    if (expo_token) {
      passItem.expo_token = expo_token;
    }
    const { isAthlete } = this.state;

    if (isAthlete) {
      const res = await sign_up(passItem);

      if (res.status === 200) {
        await SystemHelper.sleep(200);
        await this.upload(res.data.userId, true);
        await SystemHelper.sleep(200);

        await this.loginAthlete({
          email: passItem.email,
          password: passItem.password,
        });

        return;
      }
    } else {
      const res = await auth(passItem);
      if (res.status === 200) {
        await SystemHelper.sleep(200);
        this.props.navigation.popToTop();
        this.props.navigation.push('loginScreen');
        await this.upload(res.data.userId, false);

        return;
      }
    }
    this.setState({ isWorking: false });
  };

  upload = async (userId, isAthlete) => {
    if (this.state.base64Image !== '') {
      await upload_profile_picture(
        userId,
        isAthlete ? 'athlete' : 'coach',
        this.state.base64Image,
      );
    }
  };

  async loginAthlete(body) {
    const login = await athlete_login(body);
    if (login.status === 200) {
      await this.setAuth(login.data, 'athlete');
      const user = await get_athlete_me();
      if (user.status === 200) {
        await AuthService.setUser(user.data);
        this.props.navigation.navigate('DashboardStackAtlhete');
      }
    }

    this.setState({ isWorking: false });
  }

  async setAuth(data, type) {
    const toStore = {
      user: { id: data.user.id, type },
      headers: {
        Authorization: 'Bearer ' + data.token,
      },
    };

    await AuthService.setAuth(toStore);
  }

  pickImage = async () => {
    this.setState({
      image: {},
      base64Image: '',
    });
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const compressedImage = await manipulateAsync(
        result.uri,
        [{ resize: { width: 200, height: 200 } }],
        { compress: 0.7, base64: true },
      );
      let fileExtension = result.uri.substr(result.uri.lastIndexOf('.') + 1);

      this.setState({
        image: result,
        base64Image: `data:image/${fileExtension};base64,${compressedImage.base64}`,
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#060606', '#2D333C']}
          start={{
            x: 0,
            y: 0,
          }}
          end={{
            x: 1,
            y: 1,
          }}
          style={styles.background}>
          <Header title="LET'S GO" />
          <SafeAreaView onPress={Keyboard.dismiss} style={styles.safeArea}>
            <RegisterStepImageView step={this.state.isAthlete ? 8 : 13} />
            <View style={styles.content}>
              <View
                style={{
                  height: heightPercentageToDP(72),
                }}>
                <Text style={styles.title}>PHOTO DE PROFIL</Text>
                <View
                  style={{
                    marginTop: 56,
                  }}>
                  {this.state.image.uri ? (
                    <Text style={styles.subTitle}>Superbe photo !</Text>
                  ) : (
                    <Text style={styles.subTitle}>
                      C'est toujours plus sympa avec {'\n'}une photo de profil
                    </Text>
                  )}
                </View>
                <View style={styles.photoPickerContainer}>
                  <TouchableOpacity onPress={this.pickImage}>
                    {this.state.image.uri ? (
                      <View>
                        <Avatar
                          size="xlarge"
                          rounded
                          source={{ uri: this.state.image.uri }}
                        />
                      </View>
                    ) : (
                      <Image
                        style={styles.previewImage}
                        source={require('../../../../../assets/images/no_pp.jpg')}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              <Button
                loading={!this.state.isValid}
                disabled={this.state.isValid}
                title="Créer ton compte"
                customTextStyle={styles.buttonText}
                onPress={this.onRegister}
              />
            </View>
          </SafeAreaView>
        </LinearGradient>
      </View>
    );
  }
}

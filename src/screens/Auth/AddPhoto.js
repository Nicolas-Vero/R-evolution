import React from 'react';
import {View, Image, SafeAreaView, TouchableOpacity, AsyncStorage} from 'react-native'
import {ImagePicker, Permissions} from 'expo';


import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Logo from '../../common/Logo';
import Color from '../../configs/design/color';
import ResponsiveText from '../../common/ResponsiveText';
import Button from '../../common/Button';
import Icons from '../../configs/design/icon';
import {update_current_pro} from "../../api/Pros";
import {STORAGE} from "../../configs/Constants";

export default class AddPhoto extends React.Component {

  state = {
    message: 'Votre photo de profil',
    image: null,
    loading: false
  };

  async onContinuePress() {
    const {image} = this.state;
    if (image) {
      this.setState({loading: true});
      update_current_pro({avatar: this.state.image}, this.props.navigation)
        .then(res => ({
          data: res.data.data,
          headers: res.headers
        }))
        .then(async res => {
          await AsyncStorage.setItem(STORAGE.USER, JSON.stringify(res.data));
          this.props.navigation.navigate("DashboardStack");
        })
        .catch(err => console.warn(err))
        .finally(() => this.setState({loading: false}))
    } else {
      //alert("Please pick your image");
    }
  }

  askPermissionsAsync = async () => {
    let res = await Permissions.askAsync(Permissions.CAMERA);
    let res1 = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (res1.status == 'granted') {
      return true
    } else {
      alert("Permission Denied")
    }
  };


  _pickImage = async () => {
    await this.askPermissionsAsync()
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      mediaTypes: 'Images'
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({
        image: {
          uri: result.uri,
          type: result.type,
          name: result.uri.substring(result.uri.lastIndexOf('/') + 1)
        }
      });
    }
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.content}>
          <View>
            <Logo/>
            <ResponsiveText style={styles.message}>{this.state.message}</ResponsiveText>
          </View>

          <View style={styles.pickerContainer}>
            <TouchableOpacity
              onPress={this._pickImage.bind(this)}
              style={styles.imageContainer}>
              {
                this.state.image &&
                <Image source={{uri: this.state.image.uri}}
                       style={styles.selectedImage}/>
              }
              {/* <Image
                style={styles.addImageIcon}
                source={require('../../../assets/icons/cameraFill.png')}
              /> */}
            </TouchableOpacity>
            <Button
              text="Continuer"
              gradientStyle={styles.btnGradientStyle}
              onPress={this.onContinuePress.bind(this)}
              loading={this.state.loading}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = {
  content: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 20
  },
  pickerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  userAvatarContainer: {
    width: wp('40%'),
    height: wp('40%'),
    borderRadius: wp('20%'),
    borderColor: Color.SecondaryText,
    borderWidth: 1,
    backgroundColor: '#F0F2F7',
    position: 'relative',
    alignSelf: 'center'
  },
  selectedImage: {
    width: wp('40%'),
    height: wp('40%'),
    borderRadius: wp('20%'),
    resizeMode: 'cover'
  },
  addImageIcon: {
    width: wp('11%'),
    height: wp('11%'),
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  btnRightArrow: {
    width: wp('6%'),
    resizeMode: 'contain'
  },
  btnGradientStyle: {
    marginHorizontal: wp('20%'),
    marginTop: 20
  },
  message: {
    color: Color.Primary,
    fontSize: '5%',
    alignSelf: 'center',
    marginTop: 20
  }

}

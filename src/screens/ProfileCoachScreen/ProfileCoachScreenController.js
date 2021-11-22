import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE } from '../../configs/Constants';
import { get_coach_me } from '../../api/Coach';
import { get_gym } from '../../api/ReferenceData';
import * as ImagePicker from 'expo-image-picker';
import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';
import AuthService from '../../services/AuthService';
import { get_file } from '../../api/File';

export default class ProfileCoachScreenController extends AbstractScreenController {
  constructor(component) {
    super(component);

    this.initialState = {
      refresh:false,
      Coach: {},
      User: [],
      specData: [],
      SpecialitiesTerm: '',
      arrayofdiplomas: [],
      DiplomasTerm:'',
      loaded: false,
      Gymdata: [],
      diplomas: [],
      image: {},
    };
  }

  async componentDidMount() {
    const arrayOfSpec =[]
    const arrayOfDip=[]
    get_coach_me().then((res) => {
      this.component.setState({ Coach: res.data });
    });
    get_gym().then((res) => {
      this.component.setState({ Gymdata: res.data });
    });
    const user =  await get_coach_me()
    get_file('0ace0f4b-614c-4820-8970-fae39aaf6b6d.jpeg').then((res)=>{
      this.component.setState({image:res.data})
    })
   
    user.data.specialties.forEach(element => {
      arrayOfSpec.push(element.specialty_name)
    });
    user.data.diplomas.forEach(element => {
      arrayOfDip.push(element.diploma_name)
    });
    console.log(  user.data);
    this.component.setState({specData:arrayOfSpec});
    this.component.setState({arrayofdiplomas:arrayOfDip});
    this.component.setState({ User: user.data });
    this.component.setState({ loaded: true });
  }
   pickImage = async (arrayhelper) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log(result);
      this.component.setState({ image: result });
      arrayhelper.form.values.profile_picture_url = result.uri;
      console.log(arrayhelper);
    }
  };

  onContinuePress(values) {
    if (values.password === values.confirm_password) {
      auth(values)
        .then(
          (res) => (
            {
              data: res.data.data,
              headers: {
                access_token: res.data.headers['access-token'],
                token_type: res.data.headers['token-name'],
                uid: res.data.headers['uid'],
              },
            },
            this.component.changeStep
          ),
        )
        .then(async (res) => {})
        .catch((err) => {
          if (err.request && err.request.status === 422) {
          } else {
            console.log(err);
          }
        });
    } else {
      console.log('invalid confirmation');
    }
  }
}

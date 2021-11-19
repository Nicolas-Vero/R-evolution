import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE } from '../../configs/Constants';
import { get_coach_me } from '../../api/Coach';
import { get_gym } from '../../api/ReferenceData';
import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';
import AuthService from '../../services/AuthService';
export default class ProfileCoachScreenController extends AbstractScreenController {
  constructor(component) {
    super(component);

    this.initialState = {
      step: 'initial',
      stepperStep: 0,
      progress: 0,
      Coach: {},
      User: [],
      term: '',
      loaded: false,
      Gymdata: [],
      diplomas: [],
    };
  }

  async componentDidMount() {
    get_coach_me().then((res) => {
      this.component.setState({ Coach: res.data });
    });
    get_gym().then((res) => {
      this.component.setState({ Gymdata: res.data });
    });
    const user = await AuthService.getUser();
    this.component.setState({ User: user });
    this.component.setState({ loaded: true });
  }

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

import { get_coach_me, updateCoach } from '../../api/Coach';
import { upload_profile_picture } from '../../api/File';
import { get_gym } from '../../api/ReferenceData';
import * as ImagePicker from 'expo-image-picker';
import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';
import AuthService from '../../services/AuthService';
import { manipulateAsync } from 'expo-image-manipulator';

export default class ProfileCoachScreenController extends AbstractScreenController {
  constructor(component) {
    super(component);

    this.initialState = {
      refresh: false,
      Coach: {},
      User: [],
      specData: [],
      SpecialitiesTerm: '',
      arrayofdiplomas: [],
      DiplomasTerm: '',
      loaded: false,
      Gymdata: [],
      diplomas: [],
      image: {},
      base64Image: '',
    };
  }

  async componentDidMount() {
    const arrayOfSpec = [];
    const arrayOfDip = [];
    const user = await get_coach_me();
    this.component.setState({ Coach: user.content });

    get_gym().then((res) => {
      this.component.setState({ Gymdata: res.data });
    });

    user.content.specialties.forEach((element) => {
      arrayOfSpec.push(element.specialty_name);
    });
    user.content.diplomas.forEach((element) => {
      arrayOfDip.push(element.diploma_name);
    });
    this.component.setState({
      specData: arrayOfSpec,
      arrayofdiplomas: arrayOfDip,
      User: user.content,
      loaded: true,
    });
  }

  pickImage = async () => {
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

      this.component.setState({
        image: result,
        base64Image: `data:image/${fileExtension};base64,${compressedImage.base64}`,
      });
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

  onSave = async (values) => {
    const { base64Image, Coach } = this.component.state;
    if (base64Image !== '') {
      await upload_profile_picture(Coach.id, 'coach', base64Image);
    }
    values.email = values.email.toLowerCase();
    const update = await updateCoach(values);
    if (update.status === 200) {
      const coach = await get_coach_me();
      if (coach.status === 200) await AuthService.setUser(coach.content);

      this.component.props.navigation.goBack();
    }
  };
}

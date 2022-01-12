import { get_coach_me, updateCoach } from '../../api/Coach';
import { upload_profile_picture } from '../../api/File';
import { get_gym } from '../../api/ReferenceData';
import * as ImagePicker from 'expo-image-picker';
import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';
import AuthService from '../../services/AuthService';

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
    this.component.setState({ Coach: user.data });

    get_gym().then((res) => {
      this.component.setState({ Gymdata: res.data });
    });
    // get_file('0ace0f4b-614c-4820-8970-fae39aaf6b6d.jpeg').then((res) => {
    //   this.component.setState({ image: res.data });
    // });

    user.data.specialties.forEach((element) => {
      arrayOfSpec.push(element.specialty_name);
    });
    user.data.diplomas.forEach((element) => {
      arrayOfDip.push(element.diploma_name);
    });
    this.component.setState({ specData: arrayOfSpec });
    this.component.setState({ arrayofdiplomas: arrayOfDip });
    this.component.setState({ User: user.data });
    this.component.setState({ loaded: true });
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
      let fileExtension = result.uri.substr(result.uri.lastIndexOf('.') + 1);

      this.component.setState({
        image: result,
        base64Image: `data:image/${fileExtension};base64,${result.base64}`,
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

    const update = await updateCoach(values);
    if (update.status === 200) {
      const coach = await get_coach_me();
      if (coach.status === 200) await AuthService.setUser(coach.data);

      this.component.props.navigation.goBack();
    }
  };
}

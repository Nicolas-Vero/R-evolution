import { manipulateAsync } from 'expo-image-manipulator';
import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';
import AuthService from '../../services/AuthService';
import { get_gym } from '../../api/ReferenceData';
import { get_athlete_me, update_current_athlete } from '../../api/Athlete';
import * as ImagePicker from 'expo-image-picker';
import { upload_profile_picture } from '../../api/File';

export default class ProfileAthleteScreenController extends AbstractScreenController {
  constructor(component) {
    super(component);

    this.initialState = {
      step: 'initial',
      stepperStep: 0,
      progress: 0,
      Coach: {},
      User: {},
      term: '',
      multi: [],
      Gymdata: [],
      loaded: false,
      SelectedDay: [],
      multi: [],
      gym: null,
      image: {},
    };
  }

  async componentDidMount() {
    const athlete = await get_athlete_me();
    this.component.setState({ User: athlete.data });
    const arrayOfPreference = [
      { day: 'L', selected: athlete.data.is_monday_preferred },
      { day: 'M', selected: athlete.data.is_tuesday_preferred },
      { day: 'ME', selected: athlete.data.is_wednesday_preferred },
      { day: 'J', selected: athlete.data.is_thursday_preferred },
      { day: 'V', selected: athlete.data.is_friday_preferred },
      { day: 'S', selected: athlete.data.is_saturday_preferred },
      { day: 'D', selected: athlete.data.is_sunday_preferred },
    ];
    this.component.setState({ SelectedDay: arrayOfPreference });
    get_gym().then((res) => {
      const currentGymId = res.data.find(
        (gym) => gym.id === athlete.data.preferred_gym_id,
      );
      this.component.setState({
        multi: [
          athlete.data.preferred_time_start,
          athlete.data.preferred_time_end,
        ],
      });
      this.component.setState({
        Gymdata: res.data,
        gym: currentGymId.name,
        loaded: true,
      });
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

  onSave = async (values) => {
    const { base64Image, User } = this.component.state;
    if (base64Image !== '') {
      await upload_profile_picture(User.id, 'athlete', base64Image);
    }
    const update = await update_current_athlete(values);
    if (update.status === 200) {
      const athlete = await get_athlete_me();
      if (athlete.status === 200) await AuthService.setUser(athlete.data);

      this.component.props.navigation.goBack();
    }
  };

  onValidatePress = async () => {};
}

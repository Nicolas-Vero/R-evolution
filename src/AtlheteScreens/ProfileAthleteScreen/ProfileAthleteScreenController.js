import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';
import AuthService from '../../services/AuthService';
import { get_gym } from '../../api/ReferenceData';
import { get_athlete_me, update_current_athlete } from '../../api/Athlete';

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
    // loadFonts();
    const User = await AuthService.getUser();
    this.component.setState({User});
    const arrayOfPreference = [
      { day: 'L', selected: User.is_monday_preferred },
      { day: 'M', selected: User.is_tuesday_preferred },
      { day: 'ME', selected: User.is_wednesday_preferred },
      { day: 'J', selected: User.is_thursday_preferred },
      { day: 'V', selected: User.is_friday_preferred },
      { day: 'S', selected: User.is_saturday_preferred },
      { day: 'D', selected: User.is_sunday_preferred},
    ]
    this.component.setState({ SelectedDay:arrayOfPreference });
    get_gym().then((res) => {
      const currentGymId = res.data.find(
        (gym) => gym.id === User.preferred_gym_id,
      );
      this.component.setState({multi:[this.component.state.User.preferred_time_start, this.component.state.User.preferred_time_end]})
      this.component.setState({
        Gymdata: res.data,
        gym: currentGymId.name,
        loaded: true,
      });
    });
  }

  onSave = async (values) => {
    const formData = new FormData();
    formData.append('file', {
      uri: this.component.state.image.uri,
      type: this.component.state.image.type,
      name: this.component.state.image.uri,
    });
    const update = await update_current_athlete(values);
    if (update.status === 200) {
      const athlete = await get_athlete_me();
      if (athlete.status === 200) await AuthService.setUser(athlete.data);

      this.component.props.navigation.goBack();
    }
  };

  onValidatePress = async () => {};
}

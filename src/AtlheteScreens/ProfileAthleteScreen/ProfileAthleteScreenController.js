import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';
import AuthService from '../../services/AuthService';
import { get_gym } from '../../api/ReferenceData';

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
      SelectedDay: [
        { day: 'L', selected: 0 },
        { day: 'M', selected: 0 },
        { day: 'ME', selected: 0 },
        { day: 'J', selected: 0 },
        { day: 'V', selected: 0 },
        { day: 'S', selected: 0 },
        { day: 'D', selected: 0 },
      ],
      multi: [6, 17],
      gym: null,
    };
  }

  async componentDidMount() {
    // loadFonts();
    const User = await AuthService.getUser();
    this.component.setState({ User });
    get_gym().then((res) => {
      const currentGymId = res.data.find(
        (gym) => gym.id === User.preferred_gym_id,
      );

      this.component.setState({
        Gymdata: res.data,
        gym: currentGymId.name,
        loaded: true,
      });
    });
  }

  onValidatePress = async () => {};
}

import { get_availabilities } from '../../api/Availabilities';
import {
  get_coach_athlete,
  coach_booking,
  invite_prospect,
} from '../../api/Coach';
import AuthService from '../../services/AuthService';
import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';
export default class CreateBookCoachScreenController extends AbstractScreenController {
  constructor(component) {
    super(component);

    this.initialState = {
      type: 'Coaching',
      coach: {},
      isLoaded: false,
      atlhetesActifs: [],
      atlhetesProspects: [],
      isProspect: false,
    };
  }
  async componentDidMount() {
    const user = await AuthService.getUser();

    this.component.setState({ coach: user });

    get_coach_athlete()
      .then((res) => {
        this.filterDAta(res.data.athletes);
      })
      .then(() => {
        this.component.setState({ isLoaded: true });
      });
  }

  filterDAta(data) {
    const actifs = data
      .filter((user) => user.status === 'active')
      .map((user) => ({
        id: user.id,
        offer_id: user.course[0]?.id,
        full_name: `${user.first_name} ${user.last_name}`,
      }));
    const prospects = data
      .filter((user) => user.status === 'prospect')
      .map((user) => ({
        id: user.id,
        full_name: `${user.first_name} ${user.last_name}`,
        email: user.email,
      }));
    this.component.setState({
      atlhetesActifs: actifs,
      atlhetesProspects: prospects,
    });
  }

  onInviteProspectPress = async (values) => {
    const addProspect = await invite_prospect({
      email: values.email,
      first_name: values.first_name,
      last_name: values.last_name,
      gender: values.gender,
      phone: values.phone,
      date: values.date,
      slot: this.component.props.slot,
    });
    if (addProspect.status === 200) {
      this.component.props.cb &&
        this.component.props.cb(this.component.props.date);
      this.component.props.navigation.goBack();
    }
  };

  onCreateBookPress = async (values) => {
    const createBook = await coach_booking({
      coach_id: this.component.state.coach.id,
      date: values.date,
      athlete_course_id: values.offer_id,
      slot: this.component.props.slot,
      athlete_id: values.athlete_id,
    });
    if (createBook.status === 200) {
      this.component.props.cb &&
        this.component.props.cb(this.component.props.date);
      this.component.props.navigation.goBack();
    }
  };
}

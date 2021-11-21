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
      atlhetesInactifs: [],
      slots: [],
      availabilities: [],
      isProspect: false,
    };
  }
  async componentDidMount() {
    const user = await AuthService.getUser();

    this.component.setState({ coach: user });
    get_availabilities().then((res) => {
      let arrayOfAvailabilities = [];
      res.data.map((item) => {
        for (const property in item) {
          if (item[property] == true && property.match(/slot/g)) {
            arrayOfAvailabilities.push({
              [property]: item[property],
              date: item.date,
              slot: parseInt(property.slice(5)),
            });
          }
        }
      });
      this.component.setState({ availabilities: arrayOfAvailabilities });
    });

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
      .map((user) => `${user.first_name} ${user.last_name}`);
    const inactifs = data
      .filter((user) => user.status === 'inactive')
      .map((user) => `${user.first_name} ${user.last_name}`);
    const prospects = data
      .filter((user) => user.status === 'prospect')
      .map((user) => `${user.first_name} ${user.last_name}`);

    this.component.setState({
      atlhetesActifs: actifs,
      atlhetesInactifs: inactifs,
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
      slot: values.slot,
    });
    if (addProspect.status === 200) {
      this.component.props.navigation.navigate.goBack();
    }
  };
  onCreateBookPress = async (values) => {
    const createBook = await coach_booking({
      slot: values.slot,
      coach_id: this.component.state.coach.id,
      date: values.date,
      coach_course_id: 0,
      currentSlot: values.slot,
    });

    if (createBook.status === 200) {
      this.component.props.navigation.navigate.goBack();
    }
  };
}

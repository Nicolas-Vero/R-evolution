import { Animated } from 'react-native';
import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';
import AuthService from '../../services/AuthService';
import { get_athlete_active_courses } from '../../api/Athlete';
import { get_coach_offer_by_id } from '../../api/Offers';
export default class OffersScreenController extends AbstractScreenController {
  constructor(component) {
    super(component);

    this.initialState = {
      offers: [],
      screen: 'EN COURS',
      ActiveCourses: [],
      isLoaded: false,
      isDialogVisible: false,
    };
  }
  async componentDidMount() {
    this.component.setState({ isLoaded: false });
    const user = await AuthService.getUser();
    const courses = await get_athlete_active_courses();
    if (courses.status === 200) {
      // console.log('courses', courses.data);
      this.component.setState({ ActiveCourses: courses.data });
    }
    const offers = await get_coach_offer_by_id(user.coach.coach_id);
    if (offers.status === 200) {
      // console.log('offers', offers.data);
      this.component.setState({ offers: offers.data.offers });
    }
    this.component.setState({ isLoaded: true });
  }

  openDialog = () => {
    this.component.setState({ isDialogVisible: true });
  };

  onDismissDialog = () => {
    this.component.setState({
      isDialogVisible: !this.component.state.isDialogVisible,
    });
  };

  onCoachPress = () => {
    this.component.props.navigation.navigate('AthletesStack');
    this.onDismissDialog();
  };
}

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
      screen: component.props.tab === 1 ? 'CATALOGUE' : 'EN COURS',
      ActiveCourses: [],
      isLoaded: true,
      isDialogVisible: false,
    };
  }
  async componentDidMount() {
    const user = await AuthService.getUser();
    const courses = await get_athlete_active_courses();
    if (courses.status === 200) {
      // console.log('courses', courses.data);
      this.component.setState({ ActiveCourses: courses.data });
    }
    if (user.coach) {
      const offers = await get_coach_offer_by_id(user.coach.coach_id);
      if (offers.status === 200) {
        this.component.setState({ offers: offers.data.offers });
      }
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

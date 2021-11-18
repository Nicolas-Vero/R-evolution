import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';
import { get_coach_by_id } from '../../api/Coach';
import AuthService from '../../services/AuthService';
export default class CoachSheetScreenController extends AbstractScreenController {
  constructor(component) {
    super(component);

    this.initialState = {
      coach: null,
      isLoaded: false,
      coach_id: null,
    };
  }

  async componentDidMount() {
    let user = await AuthService.getUser();
    if (user.coach) {
      this.component.setState({ coach_id: user.coach?.coach_id });
      const coach = await get_coach_by_id(user.coach?.coach_id);
      if (coach.status === 200) {
        console.log(coach.data);
        this.component.setState({ coach: coach.data, isLoaded: true });
      }
    }
  }
}

import { get_athlete_active_courses_with_param } from '../../api/Coach';
import { get_paiement_for_coach } from '../../api/Paiement';
import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';
export default class AthleteSheetCoachScreenController extends AbstractScreenController {
  constructor(component) {
    super(component);

    this.initialState = {
      ActiveCourses: {},
      Paiement: [],
    };
  }
  componentDidMount() {
    get_athlete_active_courses_with_param(
      this.component.props.navigation.state.params.item.id,
    ).then((res) => {
      this.component.setState({ ActiveCourses: res.data });
    });
    get_paiement_for_coach().then((res) => {
      this.component.setState({ Paiement: res.data });
    });
  }
}

import {
  get_athlete_active_courses_with_param,
  getUserAppoinement,
} from '../../api/Coach';
import { get_paiement_for_coach } from '../../api/Paiement';
import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';
export default class AthleteSheetCoachScreenController extends AbstractScreenController {
  constructor(component) {
    super(component);

    this.initialState = {
      ActiveCourses: {},
      Paiement: [],
      isDeleteSheetModalVisible: false,
      isCancelBookModalVisible: false,
      isCanceled: false,
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
    getUserAppoinement(
      this.component.props.navigation.state.params.item.id,
    ).then((res) => {
      console.log(res.status);
      console.log('data', res.data);
    });
  }

  onDeleteSheet = () => {
    this.component.setState({ isDeleteSheetModalVisible: true });
  };

  onDismissDeleteSheetDialog = () => {
    this.component.setState({
      isDeleteSheetModalVisible:
        !this.component.state.isDeleteSheetModalVisible,
    });
  };

  onValidateDeleteSheet = () => {
    console.log('deleteSheet');
    //TODO DELETE SHEET
    this.onDismissDeleteSheetDialog();
  };

  onCancelBook = () => {
    this.component.setState({ isCancelBookModalVisible: true });
  };

  onDismissCancelSheetDialog = () => {
    this.component.setState({
      isCancelBookModalVisible: !this.component.state.isCancelBookModalVisible,
    });
  };

  onValidateCancelBook = () => {
    console.log('cancelBook');
    //TODO CANCEL BOOK
    this.onDismissCancelSheetDialog();
  };
}

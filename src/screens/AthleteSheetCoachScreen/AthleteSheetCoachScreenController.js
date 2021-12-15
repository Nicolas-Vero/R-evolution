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
      refreshing: false,
    };
  }
  componentDidMount = async () => {
    get_athlete_active_courses_with_param(
      this.component.props.navigation.state.params.item.id,
    ).then((res) => {
      this.component.setState({ ActiveCourses: res.data });
    });
    await this.fetchData();
  };

  fetchData = async () => {
    this.component.setState({ refreshing: true });
    const sales = await get_paiement_for_coach(
      this.component.props.navigation.state.params.item.id,
    );
    if (sales.status === 200) {
      this.component.setState({ Paiement: sales.data });
    }

    this.component.setState({ refreshing: false });
  };

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
    //TODO NICOLAS CANCEL BOOK
    this.onDismissCancelSheetDialog();
  };
}

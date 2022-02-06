import {
  get_athlete_active_courses_with_param,
  cancel_booking,
  unlink_athlete,
} from '../../api/Coach';
import { get_paiement_for_coach } from '../../api/Paiement';
import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';
export default class AthleteSheetCoachScreenController extends AbstractScreenController {
  constructor(component) {
    super(component);

    this.initialState = {
      ActiveCourses: {},
      Paiement: [],
      isCancelBookModalVisible: false,
      isCanceled: false,
      refreshing: false,
      books: [],
      isRemoveAthleteDialogVisible: false,
    };
  }
  componentDidMount = async () => {
    await this.fetchData();
    if (this.component.props.navigation.state.params.item.book.length) {
      this.component.setState({
        books: this.component.props.navigation.state.params.item.book,
      });
    }
  };

  fetchData = async () => {
    this.component.setState({ refreshing: true });
    const courses = await get_athlete_active_courses_with_param(
      this.component.props.navigation.state.params.item.id,
    );
    if (courses.status === 200) {
      this.component.setState({ ActiveCourses: courses.data });
    }
    const sales = await get_paiement_for_coach(
      this.component.props.navigation.state.params.item.id,
    );
    if (sales.status === 200) {
      this.component.setState({ Paiement: sales.data });
    }

    this.component.setState({ refreshing: false });
  };

  onCancelBook = () => {
    this.component.setState({ isCancelBookModalVisible: true });
  };

  onDismissCancelSheetDialog = () => {
    this.component.setState({
      isCancelBookModalVisible: !this.component.state.isCancelBookModalVisible,
    });
  };

  onValidateCancelBook = async () => {
    const { books } = this.component.state;
    const res = await cancel_booking({
      id: this.component.state.books[0].id,
    });
    if (res.status === 200) {
      books.shift();
      this.component.setState({
        books: books,
      });
    }
    this.onDismissCancelSheetDialog();
  };

  onRemoveAthletePress = () => {
    this.component.setState({
      isRemoveAthleteDialogVisible: true,
    });
  };

  onDismissRemoveAthleteDialog = () => {
    this.component.setState({
      isRemoveAthleteDialogVisible:
        !this.component.state.isRemoveAthleteDialogVisible,
    });
  };

  onValidateRemoveAthlete = async () => {
    const res = await unlink_athlete(
      this.component.props.navigation.state.params.item.id,
    );
    if (res.status === 200) {
      this.onDismissRemoveAthleteDialog();
      this.component.props.navigation.goBack();
    }
  };
}

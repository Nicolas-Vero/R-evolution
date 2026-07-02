import {
  get_athlete_active_courses_with_param,
  cancel_booking,
  unlink_athlete,
  updateAthleteSheet,
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
      book: null,
      isRemoveAthleteDialogVisible: false,
      is_validate: false,
      note: '',
    };
  }
  componentDidMount = async () => {
    if (this.component.props.navigation.state.params.item.coach) {
      this.component.setState({
        note: this.component.props.navigation.state.params.item.coach.note,
        is_validate:
          this.component.props.navigation.state.params.item.coach.is_validate,
      });
    }
    await this.fetchData();
    if (this.component.props.navigation.state.params.item.book) {
      this.component.setState({
        book: this.component.props.navigation.state.params.item.book,
      });
    }
  };

  screenDidFocus = async () => {
    this.component.setState({ refreshing: true });
    const sales = await get_paiement_for_coach(
      this.component.props.navigation.state.params.item.id,
    );
    if (sales.status === 200) {
      this.component.setState({ Paiement: sales.data });
    }
    this.component.setState({ refreshing: false });
  };

  fetchData = async () => {
    this.component.setState({ refreshing: true });
    await this.getCourse();
    const sales = await get_paiement_for_coach(
      this.component.props.navigation.state.params.item.id,
    );
    if (sales.status === 200) {
      this.component.setState({ Paiement: sales.data });
    }

    this.component.setState({ refreshing: false });
  };

  getCourse = async () => {
    const courses = await get_athlete_active_courses_with_param(
      this.component.props.navigation.state.params.item.id,
    );
    if (courses.status === 200) {
      this.component.setState({ ActiveCourses: courses.data });
    }
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
    const res = await cancel_booking({
      id: this.component.state.book.id,
    });
    if (res.status === 200) {
      this.component.setState({
        book: null,
      });

      await this.getCourse();
    }
    this.onDismissCancelSheetDialog();

    this.component.props.cb &&
      this.component.props.cb(this.component.props.date);
    this.component.props.navigation.goBack();
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

  setIsValidate = (is_validate) => {
    this.component.setState({
      is_validate,
    });
  };

  onChangeNote = (note) => {
    this.component.setState({
      note,
    });
  };
  onBackPress = async () => {
    const { is_validate, note } = this.component.state;
    const { id } = this.component.props.navigation.state.params.item;
    let needUpdate = false;
    if (!this.component.props.navigation.state.params.item.coach) {
      this.updateCoachAthlete(note, is_validate, id);

      this.component.props.navigation.goBack();
      return;
    }
    if (
      this.component.props.navigation.state.params.item.coach.is_validate !==
        is_validate ||
      this.component.props.navigation.state.params.item.coach.note !== note
    ) {
      needUpdate = true;
    }

    if (needUpdate) {
      this.updateCoachAthlete(note, is_validate, id);
    }

    this.component.props.navigation.goBack();
  };

  updateCoachAthlete = async (note, is_validate, id) => {
    await updateAthleteSheet(
      {
        is_validate,
        note: note ? note : '',
      },
      id,
    );
  };
}

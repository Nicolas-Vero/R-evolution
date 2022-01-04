import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';
import { assign_request } from '../../api/Request';

export default class TreshRequestCoachScreenController extends AbstractScreenController {
  constructor(component) {
    super(component);

    this.initialState = {
      Athlete: component.props.navigation.state.params.item,
      isLoaded: false,
      dialogVisible: false,
      requestId: component.props.navigation.state.params.item.id,
      isValidate: false,
    };
  }

  componentDidMount() {
    this.component.setState({ isLoaded: true });
  }

  onOpenDialog = () => {
    const { athlete, goals } = this.component.state.Athlete;
    console.log({ ...athlete, status: 'prospect', goals });
    this.component.setState({ dialogVisible: true });
  };

  onDismissDialog = () => {
    this.component.setState({
      dialogVisible: !this.component.state.dialogVisible,
    });
  };

  onValidate = () => {
    if (!this.component.state.requestId) return;
    try {
      assign_request(this.component.state.requestId).then(() => {
        this.component.setState({ isValidate: true });
      });
    } catch (error) {
      console.log(error);
    }
  };

  onNavigateToUserSheet = () => {
    const { athlete, goals } = this.component.state.Athlete;
    this.onDismissDialog();
    this.component.props.navigation.popToTop();
    this.component.props.navigation.navigate('AthleteSheetCoachScreen', {
      item: { ...athlete, status: 'prospect', goals },
    });
  };
}

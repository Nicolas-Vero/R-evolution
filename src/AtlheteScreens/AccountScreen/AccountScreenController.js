import { Animated } from 'react-native';
import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';
import AuthService from '../../services/AuthService';
import { renew_request } from '../../api/Athlete';
export default class AccountScreenController extends AbstractScreenController {
  constructor(component) {
    super(component);

    this.initialState = {
      haveCoach: false,
      isDialogVisible: false,
    };
  }
  async componentDidMount() {
    const user = await AuthService.getUser();
    if (user.coach) {
      this.component.setState({ haveCoach: true });
    }
  }
  onLogoutPress = async () => {
    await AuthService.removeAuth();
    this.component.props.navigation.navigate('Entry');
  };

  onProfilePress = async () => {
    this.component.props.navigation.navigate('ProfileAthleteScreen');
  };

  openDialog = () => {
    this.component.setState({ isDialogVisible: true });
  };

  onDismissDialog = () => {
    this.component.setState({
      isDialogVisible: !this.component.state.isDialogVisible,
    });
  };

  onCheckInfoPress = () => {
    this.onDismissDialog();
    this.onProfilePress();
  };

  onRenewPress = async () => {
    await renew_request();
    this.onDismissDialog();
  };
}

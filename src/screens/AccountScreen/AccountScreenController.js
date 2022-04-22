import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';
import AuthService from '../../services/AuthService';
export default class AccountScreenController extends AbstractScreenController {
  constructor(component) {
    super(component);

    this.initialState = {};
  }
  onLogoutPress = async () => {
    await AuthService.logout(true);
    this.component.props.navigation.navigate('Entry');
  };

  onProfilePress = async () => {
    this.component.props.navigation.navigate('ProfileCoachScreen');
  };
}

import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';
import AuthService from '../../services/AuthService';
import { logout } from '../../api/Coach';
export default class AccountScreenController extends AbstractScreenController {
  constructor(component) {
    super(component);

    this.initialState = {};
  }
  onLogoutPress = async () => {
    await logout();
    await AuthService.removeAuth();
    this.component.props.navigation.navigate('Entry');
  };

  onProfilePress = async () => {
    this.component.props.navigation.navigate('ProfileCoachScreen');
  };
}

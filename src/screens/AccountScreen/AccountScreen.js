import { withMappedNavigationParams } from 'react-navigation-props-mapper';
import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import AccountScreenView from './AccountScreenView';
import AccountScreenController from './AccountScreenController';

class AccountScreen extends AbstractScreen {
  constructor(props) {
    super({
      props,
      screenName: 'AccountScreen',
      viewClass: AccountScreenView,
      controllerClass: AccountScreenController,
    });
  }
}

export default withMappedNavigationParams()(AccountScreen);

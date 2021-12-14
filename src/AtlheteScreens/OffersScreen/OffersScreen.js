import { withMappedNavigationParams } from 'react-navigation-props-mapper';
import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import AccountScreenView from './OffersScreenView';
import AccountScreenController from './OffersScreenController';

class OffersScreen extends AbstractScreen {
  constructor(props) {
    super({
      props,
      screenName: 'OffersScreen',
      viewClass: AccountScreenView,
      controllerClass: AccountScreenController,
    });
  }
}

export default withMappedNavigationParams()(OffersScreen);

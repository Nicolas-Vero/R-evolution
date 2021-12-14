import { withMappedNavigationParams } from 'react-navigation-props-mapper';
import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import OffersCoachScreenController from './OffersCoachScreenController';
import OffersScreenView from './OffersCoachScreenControllerView';

class OffersCoachScreen extends AbstractScreen {
  constructor(props) {
    super({
      props,
      screenName: 'OffersCoachScreen',
      viewClass: OffersScreenView,
      controllerClass: OffersCoachScreenController,
    });
  }
}

export default withMappedNavigationParams()(OffersCoachScreen);

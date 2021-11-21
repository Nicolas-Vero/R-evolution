import { withMappedNavigationParams } from 'react-navigation-props-mapper';
import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import OffersCoachScreenController from './OffersTrainingsCoachScreenController';
import OffersScreenView from './OffersTrainingsCoachScreenView';

class OffersTrainingsCoachScreen extends AbstractScreen {
  constructor(props) {
    super({
      props,
      screenName: 'OffersTrainingsCoachScreen',
      viewClass: OffersScreenView,
      controllerClass: OffersCoachScreenController,
    });
  }
}

export default withMappedNavigationParams()(OffersTrainingsCoachScreen);

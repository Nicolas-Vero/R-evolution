import { withMappedNavigationParams } from 'react-navigation-props-mapper';
import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import UpdateOfferCoachScreenController from './UpdateOfferCoachScreenController';
import UpdateOfferCoachScreenView from './UpdateOfferCoachScreenView';

class UpdateOfferCoachScreen extends AbstractScreen {
  constructor(props) {
    super({
      props,
      screenName: 'UpdateOfferCoachScreen',
      viewClass: UpdateOfferCoachScreenView,
      controllerClass: UpdateOfferCoachScreenController,
    });
  }
}

export default withMappedNavigationParams()(UpdateOfferCoachScreen);

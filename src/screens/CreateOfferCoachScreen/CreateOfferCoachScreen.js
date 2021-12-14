import { withMappedNavigationParams } from 'react-navigation-props-mapper';
import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import CreateOfferCoachScreenView from './CreateOfferCoachScreenView';
import CreateOfferCoachScreenController from './CreateOfferCoachScreenController';

class CreateOfferCoachScreen extends AbstractScreen {
  constructor(props) {
    super({
      props,
      screenName: 'CreateOfferCoachScreen',
      viewClass: CreateOfferCoachScreenView,
      controllerClass: CreateOfferCoachScreenController,
    });
  }
}

export default withMappedNavigationParams()(CreateOfferCoachScreen);

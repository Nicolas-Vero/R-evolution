import { withMappedNavigationParams } from 'react-navigation-props-mapper';
import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import CreateBookCoachScreenView from './CreateBookCoachScreenView';
import CreateBookCoachScreenController from './CreateBookCoachScreenController';

class CreateBookCoachScreen extends AbstractScreen {
  constructor(props) {
    super({
      props,
      screenName: 'CreateBookCoachScreen',
      viewClass: CreateBookCoachScreenView,
      controllerClass: CreateBookCoachScreenController,
    });
  }
}

export default withMappedNavigationParams()(CreateBookCoachScreen);

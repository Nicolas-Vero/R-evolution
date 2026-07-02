import { withMappedNavigationParams } from 'react-navigation-props-mapper';
import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import UpdateBookCoachScreenController from './UpdateBookCoachScreenController';
import UpdateBookCoachScreenView from './UpdateBookCoachScreenView';

class UpdateBookCoachScreen extends AbstractScreen {
  constructor(props) {
    super({
      props,
      screenName: 'UpdateBookCoachScreen',
      viewClass: UpdateBookCoachScreenView,
      controllerClass: UpdateBookCoachScreenController,
    });
  }
}

export default withMappedNavigationParams()(UpdateBookCoachScreen);

import { withMappedNavigationParams } from 'react-navigation-props-mapper';
import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import PendingRequestCoachScreenView from './PendingRequestCoachScreenView';
import PendingRequestCoachScreenController from './PendingRequestCoachScreenController';

class PendingRequestCoachScreen extends AbstractScreen {
  constructor(props) {
    super({
      props,
      screenName: 'PendingRequestCoachScreen',
      viewClass: PendingRequestCoachScreenView,
      controllerClass: PendingRequestCoachScreenController,
    });
  }
}

export default withMappedNavigationParams()(PendingRequestCoachScreen);

import { withMappedNavigationParams } from 'react-navigation-props-mapper';
import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import HomeCoachScreenController from './HomeCoachScreenController';
import HomeCoachScreenView from './HomeCoachScreenView';

class HomeCoachScreen extends AbstractScreen {
  constructor(props) {
    super({
      props,
      screenName: 'HomeCoachScreen',
      viewClass: HomeCoachScreenView,
      controllerClass: HomeCoachScreenController,
    });
  }
}

export default withMappedNavigationParams()(HomeCoachScreen);

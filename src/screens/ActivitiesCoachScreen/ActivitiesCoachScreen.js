import { withMappedNavigationParams } from 'react-navigation-props-mapper';
import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import ActivitiesCoachScreenController from './ActivitiesCoachScreenController';
import ActivitiesCoachScreenView from './ActivitiesCoachScreenView';

class ActivitiesCoachScreen extends AbstractScreen {
  constructor(props) {
    super({
      props,
      screenName: 'ActivitiesCoachScreen',
      viewClass: ActivitiesCoachScreenView,
      controllerClass: ActivitiesCoachScreenController,
    });
  }
}

export default withMappedNavigationParams()(ActivitiesCoachScreen);

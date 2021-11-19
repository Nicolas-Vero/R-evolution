import { withMappedNavigationParams } from 'react-navigation-props-mapper';
import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import ProfileCoachScreenView from './ProfileCoachScreenView';
import ProfileCoachScreenController from './ProfileCoachScreenController';

class ProfileCoachScreen extends AbstractScreen {
  constructor(props) {
    super({
      props,
      screenName: 'ProfileCoachScreen',
      viewClass: ProfileCoachScreenView,
      controllerClass: ProfileCoachScreenController,
    });
  }
}

export default withMappedNavigationParams()(ProfileCoachScreen);

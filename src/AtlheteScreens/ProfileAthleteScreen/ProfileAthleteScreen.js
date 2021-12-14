import { withMappedNavigationParams } from 'react-navigation-props-mapper';
import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import ProfileAthleteScreenController from './ProfileAthleteScreenController';
import ProfileAthleteScreenView from './ProfileAthleteScreenView';

class ProfileAthleteScreen extends AbstractScreen {
  constructor(props) {
    super({
      props,
      screenName: 'ProfileAthleteScreen',
      viewClass: ProfileAthleteScreenView,
      controllerClass: ProfileAthleteScreenController,
    });
  }
}

export default withMappedNavigationParams()(ProfileAthleteScreen);

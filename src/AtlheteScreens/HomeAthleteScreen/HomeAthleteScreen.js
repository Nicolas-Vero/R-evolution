import { withMappedNavigationParams } from 'react-navigation-props-mapper';
import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import HomeAthleteController from './HomeAthleteController';
import HomeAthleteView from './HomeAthleteView';

class HomeAthleteScreen extends AbstractScreen {
  constructor(props) {
    super({
      props,
      screenName: 'HomeAthleteScreen',
      viewClass: HomeAthleteView,
      controllerClass: HomeAthleteController,
    });
  }
}

export default withMappedNavigationParams()(HomeAthleteScreen);

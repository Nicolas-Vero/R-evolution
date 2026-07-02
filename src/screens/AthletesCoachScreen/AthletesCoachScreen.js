import { withMappedNavigationParams } from 'react-navigation-props-mapper';
import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import AthletesCoachScreenController from './AthletesCoachScreenController';
import AthletesCoachScreenView from './AthletesCoachScreenView';

class AthletesCoachScreen extends AbstractScreen {
  constructor(props) {
    super({
      props,
      screenName: 'AthletesCoachScreen',
      viewClass: AthletesCoachScreenView,
      controllerClass: AthletesCoachScreenController,
    });
  }
}

export default withMappedNavigationParams()(AthletesCoachScreen);

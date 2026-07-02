import { withMappedNavigationParams } from 'react-navigation-props-mapper';
import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import TreshRequestCoachScreenView from './TreshRequestCoachScreenView';
import TreshRequestCoachScreenController from './TreshRequestCoachScreenController';

class TreshRequestCoachScreen extends AbstractScreen {
  constructor(props) {
    super({
      props,
      screenName: 'TreshRequestCoachScreen',
      viewClass: TreshRequestCoachScreenView,
      controllerClass: TreshRequestCoachScreenController,
    });
  }
}

export default withMappedNavigationParams()(TreshRequestCoachScreen);

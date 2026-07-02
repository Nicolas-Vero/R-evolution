import { withMappedNavigationParams } from 'react-navigation-props-mapper';
import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import AthleteSheetCoachScreenView from './AthleteSheetCoachScreenView';
import AthleteSheetCoachScreenController from './AthleteSheetCoachScreenController';

class AthleteSheetCoachScreen extends AbstractScreen {
  constructor(props) {
    super({
      props,
      screenName: 'AthleteSheetCoachScreen',
      viewClass: AthleteSheetCoachScreenView,
      controllerClass: AthleteSheetCoachScreenController,
    });
  }
}

export default withMappedNavigationParams()(AthleteSheetCoachScreen);

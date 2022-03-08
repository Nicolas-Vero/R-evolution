import { withMappedNavigationParams } from 'react-navigation-props-mapper';
import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import DashboardScreenView from './DashboardScreenView';
import DashboardScreenController from './DashboardScreenController';

class DashboardScreen extends AbstractScreen {
  constructor(props) {
    super({
      props,
      screenName: 'DashboardScreen',
      viewClass: DashboardScreenView,
      controllerClass: DashboardScreenController,
    });
  }
}

export default withMappedNavigationParams()(DashboardScreen);

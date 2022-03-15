import { withMappedNavigationParams } from 'react-navigation-props-mapper';
import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import SalesDetailsScreenView from './SalesDetailsScreenView';
import SalesDetailsScreenController from './SalesDetailsScreenController';

class SalesDetailsScreen extends AbstractScreen {
  constructor(props) {
    super({
      props,
      screenName: 'SalesDetailsScreen',
      viewClass: SalesDetailsScreenView,
      controllerClass: SalesDetailsScreenController,
    });
  }
}

export default withMappedNavigationParams()(SalesDetailsScreen);

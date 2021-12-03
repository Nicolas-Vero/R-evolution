import { withMappedNavigationParams } from 'react-navigation-props-mapper';
import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import CreateSaleScreenController from './CreateSaleScreenController';
import CreateSaleScreenView from './CreateSaleScreenView';

class CreateSaleScreen extends AbstractScreen {
  constructor(props) {
    super({
      props,
      screenName: 'CreateSaleScreen',
      viewClass: CreateSaleScreenView,
      controllerClass: CreateSaleScreenController,
    });
  }
}

export default withMappedNavigationParams()(CreateSaleScreen);

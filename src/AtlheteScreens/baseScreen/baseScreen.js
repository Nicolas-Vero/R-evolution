import { connect } from 'react-redux';
import { compose } from 'redux';

//TODO use for props
import { withMappedNavigationParams } from 'react-navigation-props-mapper';
import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import BaseScreenView from './BaseScreenView';
import BaseScreenController from './BaseScreenController';

class BaseScreen extends AbstractScreen {
  constructor(props) {
    super({
      props,
      screenName: 'BaseScreen',
      viewClass: BaseScreenView,
      controllerClass: BaseScreenController,
    });
  }
}

export default withMappedNavigationParams()(BaseScreen);

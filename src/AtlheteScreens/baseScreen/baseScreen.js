import { connect } from 'react-redux';
import { compose } from 'redux';

//TODO use for props
import { withMappedNavigationParams } from 'react-navigation-props-mapper';
import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import BaseScreenView from './baseScreenView';
import BaseScreenController from './baseScreenController';

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

export default BaseScreen;

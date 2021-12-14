import { connect } from 'react-redux';
import { compose } from 'redux';

//TODO use for props
import { withMappedNavigationParams } from 'react-navigation-props-mapper';
import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import NotificationsScreenController from './NotificationsScreenController';
import NotificationsScreenView from './NotificationsScreenView';
class NotificationsScreen extends AbstractScreen {
  constructor(props) {
    super({
      props,
      screenName: 'NotificationsScreen',
      viewClass: NotificationsScreenView,
      controllerClass: NotificationsScreenController,
    });
  }
}

export default withMappedNavigationParams()(NotificationsScreen);

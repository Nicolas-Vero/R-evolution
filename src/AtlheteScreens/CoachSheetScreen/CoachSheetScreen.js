import { connect } from 'react-redux';
import { compose } from 'redux';

//TODO use for props
import { withMappedNavigationParams } from 'react-navigation-props-mapper';
import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import CoachSheetScreenView from './CoachSheetScreenView';
import CoachSheetScreenController from './CoachSheetScreenController';

class CoachSheetScreen extends AbstractScreen {
  constructor(props) {
    super({
      props,
      screenName: 'CoachSheetScreen',
      viewClass: CoachSheetScreenView,
      controllerClass: CoachSheetScreenController,
    });
  }
}

export default withMappedNavigationParams()(CoachSheetScreen);

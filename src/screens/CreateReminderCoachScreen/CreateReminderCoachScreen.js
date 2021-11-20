import { withMappedNavigationParams } from 'react-navigation-props-mapper';
import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import CreateReminderCoachScreenView from './CreateReminderCoachScreenView';
import CreateReminderCoachScreenController from './CreateReminderCoachScreenController';

class CreateReminderCoachSCreen extends AbstractScreen {
  constructor(props) {
    super({
      props,
      screenName: 'CreateReminderCoachSCreen',
      viewClass: CreateReminderCoachScreenView,
      controllerClass: CreateReminderCoachScreenController,
    });
  }
}

export default withMappedNavigationParams()(CreateReminderCoachSCreen);

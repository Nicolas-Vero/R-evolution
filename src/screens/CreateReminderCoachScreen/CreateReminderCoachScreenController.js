import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';
import { coach_reminder } from '../../api/CoachReminder';

export default class CreateReminderCoachScreenController extends AbstractScreenController {
  constructor(component) {
    super(component);

    this.initialState = {
      reminders: null,
      refresh: false,
      isLoaded: false,
    };
  }

  onAddReminderPress = (values) => {
    console.log(values);
    try {
      coach_reminder(values).then(() => {
        // TODO create reminder notification
        // this.scheduleNotification(values);
        this.component.props.navigation.goBack();
      });
    } catch (error) {
      console.log(error);
    }
  };
}

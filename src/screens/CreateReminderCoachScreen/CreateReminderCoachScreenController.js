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
    try {
      coach_reminder(values).then(() => {
        this.scheduleNotification(values);
        this.component.props.navigation.popToTop();
        this.component.props.navigation.navigate('ActivitiesCoachScreen');
      });
    } catch (error) {
      console.log(error);
    }
  };
}

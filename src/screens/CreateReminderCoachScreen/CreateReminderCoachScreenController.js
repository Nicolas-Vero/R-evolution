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

  onAddReminderPress = async (values) => {
    const res = await coach_reminder(values);

    if (res.status === 200) {
      this.component.props.navigation.goBack();
    }
  };
}

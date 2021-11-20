import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';
import { get_coach_reminder } from '../../api/CoachReminder';
export default class ActivitiesCoachScreenController extends AbstractScreenController {
  constructor(component) {
    super(component);

    this.initialState = {
      reminders: null,
      refresh: false,
      screen: 'NOTIFICATIONS',
      isLoaded: false,
    };
  }
  async componentDidMount() {
    const reminders = await get_coach_reminder();
    if (reminders.status === 200) {
      this.component.setState({
        reminders: reminders.data.reminders,
        isLoaded: true,
      });
    }
  }
  onCreateReminderPress() {
    this.component.props.navigation.navigate('CreateReminderCoachScreen');
  }
}

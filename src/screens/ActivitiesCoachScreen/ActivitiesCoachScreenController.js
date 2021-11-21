import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';
import { get_coach_reminder, delete_reminder } from '../../api/CoachReminder';
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
    await this.fetchData();
  }

  fetchData = async () => {
    const reminders = await get_coach_reminder();
    if (reminders.status === 200) {
      this.component.setState({
        reminders: reminders.data.reminders,
        isLoaded: true,
      });
    }
  };
  onCreateReminderPress() {
    this.component.props.navigation.navigate('CreateReminderCoachScreen');
  }

  onDeleteReminder = async (item) => {
    const deleteReminder = await delete_reminder({ id: item.id });
    console.log(deleteReminder.status);
    if (deleteReminder.status === 200) {
      await this.fetchData();
    }
  };
}

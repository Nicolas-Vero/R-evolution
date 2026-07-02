import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';
import {
  get_coach_reminder,
  delete_reminder,
  get_coach_notifications,
  delete_coach_notification,
} from '../../api/CoachReminder';
export default class ActivitiesCoachScreenController extends AbstractScreenController {
  constructor(component) {
    super(component);

    this.initialState = {
      reminders: [],
      notifications: [],
      refreshing: false,
      screen: 'NOTIFICATIONS',
      isLoaded: false,
    };
  }

  screenDidFocus = async () => {
    await this.fetchData();
  };

  fetchData = async () => {
    this.component.setState({ refreshing: true });
    const reminders = await get_coach_reminder();
    if (reminders.status === 200) {
      this.component.setState({
        reminders: reminders.data.reminders,
      });
    }
    const notifications = await get_coach_notifications();
    if (notifications.status === 200) {
      this.component.setState({
        notifications: notifications.data,
      });
    }

    this.component.setState({
      isLoaded: true,
      refreshing: false,
    });
  };
  onCreateReminderPress() {
    this.component.props.navigation.navigate('CreateReminderCoachScreen');
  }

  onDeleteReminder = async (itemId, findIndex) => {
    const { reminders } = this.component.state;
    const deleteReminder = await delete_reminder({ reminder_id: itemId });
    if (deleteReminder.status === 200) {
      if (findIndex > -1) {
        this.component.setState({
          reminders: reminders.filter((value, index) => index !== findIndex),
        });
      }
    }
  };

  onDeleteNotification = async (itemId, findIndex) => {
    const { notifications } = this.component.state;
    const deleteNotification = await delete_coach_notification(itemId);
    if (deleteNotification.status === 200) {
      if (findIndex > -1) {
        this.component.setState({
          notifications: notifications.filter(
            (value, index) => index !== findIndex,
          ),
        });
      }
    }
  };
}

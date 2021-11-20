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
  componentDidMount() {
    this.scheduleNotification();
  }

  scheduleNotification = async (value) => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
    let date = value.date.split('/').reverse().join('-');
    Notifications.scheduleNotificationAsync({
      content: {
        title: value?.title,
        body: value?.content,
      },
      trigger:
        new Date(date).getTime() - 60000 * 60 * 5 + 60000 * 60 * value.hour,
    });
  };

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

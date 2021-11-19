import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';
import { get_coach_reminder } from '../../api/CoachReminder';
export default class ActivitiesCoachScreenController extends AbstractScreenController {
  constructor(component) {
    super(component);

    this.initialState = {
      reminders: [],
      refresh: false,
      screen: 'NOTIFICATIONS',
      isLoaded: false,
    };
  }
  componentDidMount = async () => {
    const reminders = await get_coach_reminder();
    if (reminders.status === 200) {
      this.component.setState({
        reminders: reminders.data,
      });

      this.component.setState({ isLoaded: true });
    }

    onCreateReminderPress = () => {
      this.component.props.navigation.navigate('createReminderCoachScreen');
    };
  };
}

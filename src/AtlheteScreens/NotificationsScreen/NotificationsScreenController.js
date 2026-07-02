import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';
import {
  get_athlete_notifications,
  delete_athlete_notification,
} from '../../api/Athlete';
export default class NotificationsScreenController extends AbstractScreenController {
  constructor(component) {
    super(component);

    this.initialState = {
      notifications: [],
      refreshing: false,
      isLoaded: false,
    };
  }

  async componentDidMount() {
    await this.fetchData();
  }

  fetchData = async () => {
    this.component.setState({ refreshing: true });

    const notifications = await get_athlete_notifications();
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

  onDeleteNotification = async (itemId, findIndex) => {
    const { notifications } = this.component.state;
    const deleteNotification = await delete_athlete_notification(itemId);
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

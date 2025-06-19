import { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  get_coach_reminder,
  delete_reminder,
  get_coach_notifications,
  delete_coach_notification,
} from '../../api/CoachReminder';

// Hook custom, logique remplaçant l’ancien contrôleur
export function useActivitiesCoachScreen() {
  const navigation = useNavigation();

  const [reminders, setReminders] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [screen, setScreen] = useState('NOTIFICATIONS');

  // Fetch des données (reminders et notifications)
  const fetchData = useCallback(async () => {
    setRefreshing(true);

    const remindersRes = await get_coach_reminder();
    if (remindersRes.status === 200) {
      setReminders(remindersRes.data.reminders);
    }

    const notificationsRes = await get_coach_notifications();
    if (notificationsRes.status === 200) {
      setNotifications(notificationsRes.data);
    }

    setIsLoaded(true);
    setRefreshing(false);
  }, []);

  // Navigation vers l’écran création reminder
  const onCreateReminderPress = useCallback(() => {
    navigation.navigate('CreateReminderCoachScreen');
  }, [navigation]);

  // Suppression reminder
  const onDeleteReminder = useCallback(async (itemId, index) => {
    const res = await delete_reminder({ reminder_id: itemId });
    if (res.status === 200) {
      setReminders(reminders =>
        reminders.filter((_, i) => i !== index)
      );
    }
  }, []);

  // Suppression notification
  const onDeleteNotification = useCallback(async (itemId, index) => {
    const res = await delete_coach_notification(itemId);
    if (res.status === 200) {
      setNotifications(notifs =>
        notifs.filter((_, i) => i !== index)
      );
    }
  }, []);

  return {
    reminders,
    notifications,
    refreshing,
    isLoaded,
    screen,
    setScreen,
    fetchData,
    onCreateReminderPress,
    onDeleteReminder,
    onDeleteNotification,
  };
}

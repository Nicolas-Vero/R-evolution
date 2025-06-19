import { useEffect, useState, useCallback } from 'react';
import {
  get_athlete_active_courses_with_param,
  cancel_booking,
  unlink_athlete,
  updateAthleteSheet,
} from '../../api/Coach';
import { get_paiement_for_coach } from '../../api/Paiement';

export function useAthleteSheetCoachScreen({ navigation, route, cb }) {
  const athlete = route.params?.item;
  const date = route.params?.date;

  const [ActiveCourses, setActiveCourses] = useState({});
  const [Paiement, setPaiement] = useState([]);
  const [isCancelBookModalVisible, setIsCancelBookModalVisible] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [book, setBook] = useState(route.params?.item?.book || null);
  const [isRemoveAthleteDialogVisible, setIsRemoveAthleteDialogVisible] = useState(false);
  const [is_validate, setIsValidate] = useState(
    route.params?.item?.coach?.is_validate || false
  );
  const [note, setNote] = useState(route.params?.item?.coach?.note || '');

  // Initial fetch on mount
  useEffect(() => {
    if (athlete?.coach) {
      setNote(athlete.coach.note);
      setIsValidate(athlete.coach.is_validate);
    }
    fetchData();
    if (athlete?.book) setBook(athlete.book);
    // eslint-disable-next-line
  }, []);

  // Refresh on focus (if needed)
  const screenDidFocus = useCallback(async () => {
    setRefreshing(true);
    const sales = await get_paiement_for_coach(athlete?.id);
    if (sales.status === 200) setPaiement(sales.data);
    setRefreshing(false);
  }, [athlete?.id]);

  const fetchData = useCallback(async () => {
    setRefreshing(true);
    await getCourse();
    const sales = await get_paiement_for_coach(athlete?.id);
    if (sales.status === 200) setPaiement(sales.data);
    setRefreshing(false);
  }, [athlete?.id]);

  const getCourse = useCallback(async () => {
    const courses = await get_athlete_active_courses_with_param(athlete?.id);
    if (courses.status === 200) setActiveCourses(courses.data);
  }, [athlete?.id]);

  // Booking annulation
  const onCancelBook = useCallback(() => setIsCancelBookModalVisible(true), []);
  const onDismissCancelSheetDialog = useCallback(() => {
    setIsCancelBookModalVisible((v) => !v);
  }, []);
  const onValidateCancelBook = useCallback(async () => {
    if (!book?.id) return;
    const res = await cancel_booking({ id: book.id });
    if (res.status === 200) {
      setBook(null);
      await getCourse();
    }
    onDismissCancelSheetDialog();
    if (cb) cb(date);
    navigation.goBack();
  }, [book, getCourse, navigation, cb, date, onDismissCancelSheetDialog]);

  // Remove athlete
  const onRemoveAthletePress = useCallback(() => setIsRemoveAthleteDialogVisible(true), []);
  const onDismissRemoveAthleteDialog = useCallback(() => {
    setIsRemoveAthleteDialogVisible((v) => !v);
  }, []);
  const onValidateRemoveAthlete = useCallback(async () => {
    const res = await unlink_athlete(athlete?.id);
    if (res.status === 200) {
      onDismissRemoveAthleteDialog();
      navigation.goBack();
    }
  }, [athlete?.id, navigation, onDismissRemoveAthleteDialog]);

  // Note / Validation state
  const handleSetIsValidate = useCallback((v) => setIsValidate(v), []);
  const handleChangeNote = useCallback((n) => setNote(n), []);

  // Back : update seulement si modif
  const onBackPress = useCallback(async () => {
    let needUpdate = false;
    if (!athlete?.coach) {
      await updateCoachAthlete(note, is_validate, athlete?.id);
      navigation.goBack();
      return;
    }
    if (
      athlete.coach.is_validate !== is_validate ||
      athlete.coach.note !== note
    ) {
      needUpdate = true;
    }
    if (needUpdate) {
      await updateCoachAthlete(note, is_validate, athlete?.id);
    }
    navigation.goBack();
  }, [athlete, is_validate, note, navigation]);

  const updateCoachAthlete = useCallback(async (note, is_validate, id) => {
    await updateAthleteSheet({ is_validate, note: note || '' }, id);
  }, []);

  return {
    ActiveCourses,
    Paiement,
    isCancelBookModalVisible,
    isCanceled,
    refreshing,
    book,
    isRemoveAthleteDialogVisible,
    is_validate,
    note,
    setNote: handleChangeNote,
    setIsValidate: handleSetIsValidate,
    onCancelBook,
    onDismissCancelSheetDialog,
    onValidateCancelBook,
    onRemoveAthletePress,
    onDismissRemoveAthleteDialog,
    onValidateRemoveAthlete,
    onBackPress,
    fetchData,
    screenDidFocus,
    getCourse,
  };
}

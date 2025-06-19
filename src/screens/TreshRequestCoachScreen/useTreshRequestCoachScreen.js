import { useState, useCallback } from 'react';
import { assign_request } from '../../api/Request';
import { useNavigation, useRoute } from '@react-navigation/native';

export function useTreshRequestCoachScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  // Récupération des données passées en navigation
  const item = route.params?.item;

  // États locaux
  const [isLoaded, setIsLoaded] = useState(true);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isValidate, setIsValidate] = useState(false);

  // Affectation
  const onValidate = useCallback(async () => {
    if (!item?.id) return;
    const res = await assign_request(item.id);
    if (res.status === 200) {
      setIsValidate(true);
    }
  }, [item?.id]);

  // Dialogue
  const onOpenDialog = () => setDialogVisible(true);
  const onDismissDialog = () => setDialogVisible((v) => !v);

  // Navigation vers fiche user
  const onNavigateToUserSheet = () => {
    const { athlete, goals } = item;
    onDismissDialog();
    navigation.popToTop();
    navigation.navigate('AthleteSheetCoachScreen', {
      item: { ...athlete, status: 'prospect', goals },
    });
  };

  return {
    Athlete: item,
    isLoaded,
    dialogVisible,
    isValidate,
    onOpenDialog,
    onDismissDialog,
    onValidate,
    onNavigateToUserSheet,
  };
}

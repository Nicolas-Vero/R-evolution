import { useState, useEffect, useCallback } from 'react';
import { get_coach_athlete, delete_athlete, athletePendingPayment } from '../../api/Coach';

export function useAthletesCoachScreen(navigation) {
  // State
  const [screen, setScreen] = useState('ACTIFS');
  const [initialData, setInitialData] = useState([]);
  const [athletes, setAthletes] = useState([]);
  const [atlhetesActifs, setAtlhetesActifs] = useState([]);
  const [atlhetesInactifs, setAtlhetesInactifs] = useState([]);
  const [atlhetesProspects, setAtlhetesProspects] = useState([]);
  const [search, setSearch] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isDeleteSheetModalVisible, setIsDeleteSheetModalVisible] = useState(false);
  const [selectedAthleteToDelete, setSelectedAthleteToDelete] = useState(null);

  // Chargement initial et focus
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data
  const fetchData = useCallback(async () => {
    setRefreshing(true);

    const athletesRes = await get_coach_athlete();
    if (athletesRes.status === 200) {
      setInitialData(athletesRes.data.athletes);
      await filterData(athletesRes.data.athletes);
      setRefreshing(false);
      setLoaded(true);
    }
  }, []);

  // Filtrage des données (actifs, inactifs, prospects)
  const filterData = async (rawData) => {
    let actifs = [];
    let inactifs = [];
    let prospects = [];
    const pendingPaymentRes = await athletePendingPayment();
    const pendingIds = pendingPaymentRes?.data || [];

    rawData.forEach((athlete) => {
      switch (athlete.status) {
        case 'active':
          actifs.push({ ...athlete, pendingPayment: pendingIds.includes(athlete.id) });
          break;
        case 'inactive':
          inactifs.push({ ...athlete, pendingPayment: pendingIds.includes(athlete.id) });
          break;
        case 'prospect':
          prospects.push(athlete);
          break;
        default:
          break;
      }
    });

    setAtlhetesActifs(actifs);
    setAtlhetesInactifs(inactifs);
    setAtlhetesProspects(prospects);
    setAthletes([]); // reset filtered list
  };

  // Changement d'onglet
  const handleChangeTab = (tab) => {
    setScreen(tab);
    setSearch('');
    setAthletes([]);
  };

  // Recherche
  const filterSearch = (value) => {
    setSearch(value);
    let newList = [];
    if (screen === 'ACTIFS') {
      newList = filterAthletes(atlhetesActifs, value);
    } else if (screen === 'INACTIFS') {
      newList = filterAthletes(atlhetesInactifs, value);
    } else {
      newList = filterAthletes(atlhetesProspects, value);
    }
    setAthletes(newList.length ? newList : []);
  };

  // Filtre nom complet
  const filterAthletes = (list, value) =>
    list.filter((athlete) => {
      const fullName = `${athlete.first_name} ${athlete.last_name}`.toLowerCase();
      return fullName.includes(value.toLowerCase());
    });

  // Suppression
  const handleDeleteSheetPress = (athleteId) => {
    setIsDeleteSheetModalVisible(true);
    setSelectedAthleteToDelete(athleteId);
  };

  const handleDismissDeleteSheetDialog = () => {
    setIsDeleteSheetModalVisible((visible) => !visible);
  };

  const handleValidateDeleteSheet = async () => {
    if (!selectedAthleteToDelete) return;
    await delete_athlete(selectedAthleteToDelete);
    handleDismissDeleteSheetDialog();
    setSelectedAthleteToDelete(null);
    await fetchData();
  };

  // Navigation
  const handleNavigate = (item) => {
    navigation.navigate('AthleteSheetCoachScreen', item);
  };

  // Expose API du hook
  return {
    screen,
    setScreen: handleChangeTab,
    initialData,
    athletes,
    atlhetesActifs,
    atlhetesInactifs,
    atlhetesProspects,
    search,
    setSearch: filterSearch,
    loaded,
    refreshing,
    isDeleteSheetModalVisible,
    selectedAthleteToDelete,
    handleDeleteSheetPress,
    handleDismissDeleteSheetDialog,
    handleValidateDeleteSheet,
    handleNavigate,
    fetchData,
  };
}

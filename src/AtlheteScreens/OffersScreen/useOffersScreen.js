import { useEffect, useState } from 'react';
import AuthService from '../../services/AuthService';
import { get_athlete_active_courses } from '../../api/Athlete';
import { get_coach_offer_by_id } from '../../api/Offers';

export const useOffersScreen = (tab) => {
  const [offers, setOffers] = useState([]);
  const [screen, setScreen] = useState(tab === 1 ? 'CATALOGUE' : 'EN COURS');
  const [activeCourses, setActiveCourses] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const user = await AuthService.getUser();
      const courses = await get_athlete_active_courses();
      if (courses.status === 200) setActiveCourses(courses.data);

      if (user.coach) {
        const offersRes = await get_coach_offer_by_id(user.coach.coach_id);
        if (offersRes.status === 200) setOffers(offersRes.data.offers);
      }
      setIsLoaded(true);
    };
    fetchData();
  }, []);

  const openDialog = () => setIsDialogVisible(true);
  const closeDialog = () => setIsDialogVisible(false);

  return {
    offers,
    screen,
    setScreen,
    activeCourses,
    isLoaded,
    isDialogVisible,
    openDialog,
    closeDialog,
  };
};

export default useOffersScreen; 
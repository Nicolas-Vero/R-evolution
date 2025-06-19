import { useState, useEffect } from 'react';
import {
  get_coach_athlete,
  coach_booking,
  invite_prospect,
  coach_booking_other,
} from '../../api/Coach';
import AuthService from '../../services/AuthService';

export function useCreateBookCoachScreen({ navigation, date, slot, cb }) {
  const [coach, setCoach] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [athletesActifs, setAthletesActifs] = useState([]);
  const [athletesProspects, setAthletesProspects] = useState([]);
  const [isProspect, setIsProspect] = useState(false);
  const [isOther, setIsOther] = useState(false);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);

  // Equivalent de componentDidMount
  useEffect(() => {
    (async () => {
      const user = await AuthService.getUser();
      setCoach(user);

      const res = await get_coach_athlete();
      filterData(res.data.athletes);
      setIsLoaded(true);
    })();
  }, []);

  function filterData(data) {
    setAthletesActifs(
      data
        .filter((user) => user.status === 'active' && user.course)
        .map((user) => ({
          id: user.id,
          offer_id: Array.isArray(user.course) && user.course.length
            ? user.course[0].id
            : user.course?.id,
          full_name: `${user.first_name} ${user.last_name}`,
        }))
    );
    setAthletesProspects(
      data
        .filter((user) => user.status === 'prospect')
        .map((user) => ({
          id: user.id,
          full_name: `${user.first_name} ${user.last_name}`,
          email: user.email,
        }))
    );
  }

  const onChangeTitle = (value) => setTitle(value);
  const onChangeDescription = (value) => setDescription(value);

  const onCreateOtherPress = async () => {
    const res = await coach_booking_other({ title, description, date, slot });
    if (res.status === 200) {
      cb && cb(date);
      navigation.goBack();
    }
  };

  const onInviteProspectPress = async (values) => {
    const addProspect = await invite_prospect({
      email: values.email.toLowerCase(),
      first_name: values.first_name,
      last_name: values.last_name,
      gender: values.gender,
      phone: values.phone,
      date: values.date,
      slot,
    });
    if (addProspect.status === 200) {
      cb && cb(date);
      navigation.goBack();
    }
  };

  const onCreateBookPress = async (values) => {
    const createBook = await coach_booking({
      coach_id: coach.id,
      date: values.date,
      athlete_course_id: values.offer_id,
      slot,
      athlete_id: values.athlete_id,
    });
    if (createBook.status === 200) {
      cb && cb(date);
      navigation.goBack();
    }
  };

  return {
    coach,
    isLoaded,
    athletesActifs,
    athletesProspects,
    isProspect,
    setIsProspect,
    isOther,
    setIsOther,
    title,
    setTitle: onChangeTitle,
    description,
    setDescription: onChangeDescription,
    onCreateOtherPress,
    onInviteProspectPress,
    onCreateBookPress,
  };
}

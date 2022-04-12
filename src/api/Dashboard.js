import { request } from '../services/axiosService';

export const getYearTurnover = async (date) => {
  return await request('GET', true, `/dashboard/turnover/year`, { date });
};

export const getMonthTurnover = async (date) => {
  console.log(date);
  return await request('GET', true, `/dashboard/turnover/month`, { date });
};

export const getAthletesData = async () => {
  return await request('GET', true, `/dashboard/athleteData`);
};

export const getAthletesGoalsData = async () => {
  return await request('GET', true, `/dashboard/coach/Athletegoal`);
};

export const getAthletesPaymentsData = async (date) => {
  return await request('GET', true, `/dashboard/athletePaymentData`, { date });
};

export const postMonthlyCoachGoal = async (goal, date) => {
  return await request('POST', true, `/dashboard/coach/goal`, null, {
    goal,
    date,
  });
};

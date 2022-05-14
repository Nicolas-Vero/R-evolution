const reducersDefinition = [
  {
    type: 'userAuth',
    isPersistent: true,
    initialState: null,
  },
  {
    type: 'app',
    isPersistent: true,
    initialState: {
      isIntroScreenShowed: false,
      currentLanguage: null,
    },
  },
  {
    type: 'station',
    isPersistent: false,
    initialState: null,
  },
  {
    type: 'user',
    isPersistent: false,
    initialState: {
      position: null,
      cca2: null,
      profile: null,
      defaultPaymentMethod: null,
      isDefaultPaymentMethodLoaded: false,
    },
  },
  {
    type: 'coachFilteredTime',
    isPersistent: true,
    initialState: {
      start: Number('0'),
      end: 23,
    },
  },
  {
    type: 'coachSlots',
    isPersistent: true,
    initialState: {
      savedSlots: [],
    },
  },
];

export default reducersDefinition;

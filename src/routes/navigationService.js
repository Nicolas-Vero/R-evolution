import {NavigationActions} from 'react-navigation';

let navigator;

setTopLevelNavigator = navigatorRef => {
  navigator = navigatorRef;
};

navigate = (routeName, params) => {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
};

export default {
  navigate,
  setTopLevelNavigator,
};
